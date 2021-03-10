import React, { useEffect, useReducer } from 'react';
import numeral from 'numeral';
import classnames from 'classnames';
import sortBy from 'lodash/sortBy';

import Button from './components/Button';
import Select from './components/Select';
import SelectOption from './components/SelectOption';
import Table from './components/Table';
import {
    breakdownDocument,
    getMonthNumber,
    getYearNumber,
    readFile
} from './utils/utilFunctions';
import { Months } from './constants';
import { reducer, initialState } from './store';
import { ActionTypes } from './store';

const { dialog } = require('electron').remote;

numeral.defaultFormat('$0,0.00');

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDialogOpen = async () => {
        const { filePaths } = await dialog.showOpenDialog({
            buttonLabel: 'Upload',
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'CSV', extensions: ['csv'] }]
        });
        dispatch({ type: ActionTypes.SET_FILE_PATHS, payload: { filePaths } });
    };

    useEffect(() => {
        const documentsAsStrings = state.filePaths.map(readFile);
        const documentsData = documentsAsStrings.map(breakdownDocument);

        dispatch({
            type: ActionTypes.SET_DOCUMENTS_DATA,
            payload: { documentsData }
        });
    }, [state.filePaths]);

    useEffect(() => {
        console.log('currentMonth changed!');
    }, [state.currentMonth]);

    const handleSetCurrentMonth = event =>
        dispatch({
            type: ActionTypes.SET_CURRENT_MONTH,
            payload: { currentMonth: Number(event.target.value) }
        });

    const handleSetCurrentYear = event =>
        dispatch({
            type: ActionTypes.SET_CURRENT_YEAR,
            payload: { currentYear: Number(event.target.value) }
        });

    const mappedMonthsOptions = Months.map((m, index) => (
        <SelectOption value={index} text={m} key={m} />
    ));

    const results = state.documentsData.reduce(
        (result, currentDocument) => {
            currentDocument.data.forEach(row => {
                const month = getMonthNumber(row);
                const year = getYearNumber(row);

                const modifiedMonthNum = state.currentMonth + 1;
                const showRow =
                    month === modifiedMonthNum && year === state.currentYear;

                const rowAmount = row[3];

                const target = numeral(rowAmount);
                const isNumeral = !isNaN(target.value());

                if (isNumeral && target.value() > 0 && showRow) {
                    result.income.add(target.value());
                    result.incomeTable.push(row);
                }

                if (isNumeral && target.value() < 0 && showRow) {
                    result.expenses.add(target.value());
                    result.expensesTable.push(row);
                }
            });

            result.incomeTable = sortBy(result.incomeTable, [
                function (r) {
                    return 0 - numeral(r[3]).value();
                }
            ]);

            result.expensesTable = sortBy(result.expensesTable, [
                function (r) {
                    return numeral(r[3]).value();
                }
            ]);

            return result;
        },
        {
            expenses: numeral(0),
            expensesTable: [],
            income: numeral(0),
            incomeTable: []
        }
    );

    const income = results.income.format();
    const expenses = results.expenses.format();

    const clonedIncome = results.income.clone();

    const difference = clonedIncome.add(results.expenses.value());
    const formattedDifference = difference.format();
    const differenceClassName = classnames('title', 'is-2', {
        'has-text-success': difference.value() > 0,
        'has-text-danger': difference.value() < 0
    });

    return (
        <section className="section">
            <h1 className="title is-1">Budget Helper</h1>
            <div className="columns">
                <div className="column is-3">
                    <Button handleClick={handleDialogOpen} text="Open" />
                    <hr />
                    <p>
                        Income: <br />
                        <span className="title is-2 has-text-success">
                            {income}
                        </span>
                    </p>
                    <p>
                        Expenses: <br />
                        <span className="title is-2 has-text-danger">
                            {expenses}
                        </span>
                    </p>
                    <p>
                        Difference: <br />
                        <span className={differenceClassName}>
                            {formattedDifference}
                        </span>
                    </p>
                </div>
                <div className="column">
                    <Select
                        handleChange={handleSetCurrentMonth}
                        value={state.currentMonth}
                    >
                        {mappedMonthsOptions}
                    </Select>
                    <Select
                        handleChange={handleSetCurrentYear}
                        value={state.currentYear}
                    >
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </Select>
                    <hr />
                    <p className="title is-3">Income:</p>
                    <Table data={results.incomeTable} />
                    <p className="title is-3">Expenses:</p>
                    <Table data={results.expensesTable} />
                </div>
            </div>
        </section>
    );
}

export default App;
