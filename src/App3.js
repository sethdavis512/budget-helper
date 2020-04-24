import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import TextInput from './components/TextInput';
import { buildTable, readFile, toDollar } from './utils/utilFunctions';
import numeral from 'numeral';
import isNumber from 'lodash/isNumber';
import toNumber from 'lodash/toNumber';
import { getMonth } from 'date-fns';

const { dialog } = require('electron').remote;

numeral.defaultFormat('$0,0.00');

const JANUARY = 'January';
const FEBRUARY = 'February';
const MARCH = 'March';
const APRIL = 'April';
const MAY = 'May';
const JUNE = 'June';
const JULY = 'July';
const AUGUST = 'August';
const SEPTEMBER = 'September';
const OCTOBER = 'October';
const NOVEMBER = 'November';
const DECEMBER = 'December';

const MONTHS = [
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
];

const dataByMonth = MONTHS.reduce((acc, cur) => {
    acc[cur] = {
        income: numeral(0),
        expenses: numeral(0),
        transactions: []
    };
    return acc;
}, {});

function App() {
    const [content, setContent] = useState([]);
    const [files, setFiles] = useState([]);
    const [filter, setFilter] = useState('');
    const [isTableVisible, setIsTableVisible] = useState(true);

    const initialMonth = MONTHS[getMonth(new Date())];
    const [targetMonth, setTargetMonth] = useState(initialMonth);

    content.forEach(doc => {
        const docArr = doc.split('\n');
        const rowArr = docArr
            .filter(line => {
                const isCardTransaction = !line.includes('Transfer');
                const searchMatch = line.includes(filter);
                return isCardTransaction && searchMatch;
            })
            .map(line => {
                const output = line
                    .replace('Indeed,', 'Indeed')
                    .split(',')
                    .slice(1, 4);
                return output;
            });
        rowArr.forEach(row => {
            const dateCell = row[0];
            const monthIndex = dateCell && toNumber(dateCell.substring(0, 2));
            if (monthIndex) {
                dataByMonth[MONTHS[monthIndex - 1]].transactions.push(row);
            }
        });
    });

    const activeMonth = dataByMonth[targetMonth]
        ? dataByMonth[targetMonth]
        : {
              transactions: [],
              income: numeral(0),
              expenses: numeral(0)
          };

    const handleMonthButtonClick = event => {
        const checkMonth =
            event.target.id === targetMonth ? '' : event.target.id;
        setTargetMonth(checkMonth);
    };

    const handleDialogOpen = async () => {
        const { filePaths } = await dialog.showOpenDialog({
            buttonLabel: 'Upload',
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'CSV', extensions: ['csv'] }]
        });
        setFiles(filePaths);
    };

    const updateContents = filePathArr => {
        // Take array of file paths, get content as long strings from CSV
        const documentsAsStrings = filePathArr.map(readFile);
        setContent(documentsAsStrings);
    };

    useEffect(() => {
        // updateContents(files);
    }, [files]);

    activeMonth.transactions.forEach(row => {
        const numCell = numeral(row[2]);
        const target = isNumber(numCell.value()) ? numCell.value() : 0;
        if (target > 0) {
            activeMonth.income.add(target);
        } else if (target < 0) {
            activeMonth.expenses.add(target);
        }
    });

    const tables = buildTable(activeMonth.transactions);

    const diff = toDollar(
        activeMonth.income.difference(Math.abs(activeMonth.expenses.value()))
    );

    const monthButtons = (
        <div className="buttons">
            {MONTHS.map(m => (
                <Button
                    buttonClass={m === targetMonth && 'is-success'}
                    id={m}
                    text={m}
                    handleClick={handleMonthButtonClick}
                />
            ))}
        </div>
    );
    const hasContent = content.length > 0;
    const showMonthButtons = hasContent ? monthButtons : null;
    const showTables = hasContent ? tables : null;
    const calculations = (
        <>
            <h3 className="title is-3">
                Income:{' '}
                <span style={{ color: 'green' }}>
                    {activeMonth.income.format()}
                </span>
            </h3>
            <h3 className="title is-3">
                Expenses:{' '}
                <span style={{ color: 'red' }}>
                    {activeMonth.expenses.format()}
                </span>
            </h3>
            <h3 className="title is-3">
                Diff: <span style={{ color: 'black' }}>{diff}</span>
            </h3>
        </>
    );
    const showCalculations = hasContent ? calculations : null;
    return (
        <section className="section">
            <h1 className="title is-1">Transactions</h1>
            <div className="box box-horizontal">
                <Button
                    buttonClass="is-success"
                    text="Open"
                    handleClick={handleDialogOpen}
                />
                <TextInput
                    label=""
                    handleChange={event => setFilter(event.target.value)}
                />
                <Button
                    buttonClass="is-success"
                    text={`${isTableVisible ? 'Hide' : 'Show'} Transactions`}
                    handleClick={() => setIsTableVisible(!isTableVisible)}
                />
            </div>
            <div className="columns">
                <div className="column">
                    {showCalculations}
                    {showMonthButtons}
                </div>
                <div className="column">{showTables}</div>
            </div>
        </section>
    );
}

export default App;
