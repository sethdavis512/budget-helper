import React, { useEffect } from 'react';
import numeral from 'numeral';
import { DragDropContext } from 'react-beautiful-dnd';

import Button from './components/Button';
import Select from './components/Select';
import SelectOption from './components/SelectOption';
import {
    parseDocument,
    readFile,
    getUniqueId,
    getTransactionsFromDocuments
} from './utils/utilFunctions';
import { Months } from './constants';
import useStore, { StoreConstants } from './hooks/useStore';
import TransactionList from './components/TransactionList';
import TransactionListItem from './components/TransactionListItem';
import BudgetList from './components/BudgetList';
import BudgetListItem from './components/BudgetListItem';

const { dialog } = require('electron').remote;

numeral.defaultFormat('$0,0.00');

function App() {
    const [storeState, storeActions] = useStore();

    const handleDialogOpen = async () => {
        const { filePaths } = await dialog.showOpenDialog({
            buttonLabel: 'Upload',
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'CSV', extensions: ['csv'] }]
        });
        storeActions.setValue(StoreConstants.FILE_PATHS, filePaths);
    };

    useEffect(() => {
        const documentsAsStrings = storeState[StoreConstants.FILE_PATHS].map(
            readFile
        );
        const documentsData = documentsAsStrings.map(parseDocument);
        storeActions.setValue(
            StoreConstants.TRANSACTIONS,
            getTransactionsFromDocuments(documentsData)
        );
        storeActions.removeAllTransactionsFromAllBudgets();
    }, [storeState[StoreConstants.FILE_PATHS]]);

    const handleSetCurrentMonth = ({ target }) =>
        storeActions.setValue(StoreConstants.CURRENT_MONTH, target.value);
    const handleSetCurrentYear = ({ target }) =>
        storeActions.setValue(StoreConstants.CURRENT_YEAR, target.value);

    const mappedMonthsOptions = Months.map((m, index) => (
        <SelectOption value={index} text={m} key={m} />
    ));

    const onDragEnd = result => {
        // console.log(result);
        const { destination, source, draggableId } = result;
        // console.log(`${draggableId} was dragged to ${destination.droppableId}`);

        if (!destination) {
            return;
        }

        const sameDropZone = source.droppableId === destination.droppableId;

        if (sameDropZone) {
            console.log('Same column');
        }

        const targetTransaction = storeState[StoreConstants.TRANSACTIONS].find(
            t => t.id === draggableId
        );

        const targetBudgetIndex = storeState[StoreConstants.BUDGETS].findIndex(
            b => b.id === destination.droppableId
        );

        storeActions.addTransactionToBudget(
            targetTransaction,
            targetBudgetIndex
        );

        storeActions.removeTransactionFromTransactions(targetTransaction.id);
    };

    return (
        <section className="section">
            <h1 className="title is-1">Budget Helper</h1>
            <div className="columns">
                <div className="column">
                    <Button handleClick={handleDialogOpen} text="Open" />
                    <hr />
                </div>
                <div className="column">
                    <Select
                        handleChange={handleSetCurrentMonth}
                        value={storeState.currentMonth}
                    >
                        {mappedMonthsOptions}
                    </Select>
                    <Select
                        handleChange={handleSetCurrentYear}
                        value={storeState.currentYear}
                    >
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </Select>
                    <hr />
                </div>
            </div>
            <div className="columns">
                <div className="column is-2">
                    <p>
                        Income: <br />
                        <span className="title is-2 has-text-success">
                            {storeState.income}
                        </span>
                    </p>
                    <p>
                        Expenses: <br />
                        <span className="title is-2 has-text-danger">
                            {storeState.expenses}
                        </span>
                    </p>
                    <p>
                        Difference: <br />
                        <span className="title is-2">
                            {storeState.difference}
                        </span>
                    </p>
                </div>
                <div className="column">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="columns">
                            <div className="column is-4">
                                <p className="title is-3">Income:</p>
                                <TransactionList id="transactionList">
                                    {storeState[
                                        StoreConstants.TRANSACTIONS
                                    ].map((t, index) => {
                                        return (
                                            <TransactionListItem
                                                id={t.id}
                                                index={index}
                                                key={getUniqueId(
                                                    'transactionKey'
                                                )}
                                                date={t['Posting Date']}
                                                description={t['Description']}
                                                amount={numeral(
                                                    t['Amount']
                                                ).format()}
                                            />
                                        );
                                    })}
                                </TransactionList>
                            </div>
                            <div className="column">
                                <p className="title is-3">Budgets:</p>
                                {storeState[StoreConstants.BUDGETS].map(
                                    budget => (
                                        <BudgetList name={budget.name}>
                                            <BudgetListItem
                                                id={budget.id}
                                                transactions={
                                                    budget.transactions
                                                }
                                            />
                                        </BudgetList>
                                    )
                                )}
                            </div>
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </section>
    );
}

export default App;
