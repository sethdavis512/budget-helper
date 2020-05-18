import React from 'react';
import snakeCase from 'lodash/snakeCase';
import upperCase from 'lodash/upperCase';
import numeral from 'numeral';
import { Months } from '../constants';

const fs = require('fs');

export const readFile = path => fs.readFileSync(path, 'utf8');

export const breakdownDocument = docString => {
    const docToArrayOfStrings = docString.split('\n');
    const finalDocArray = docToArrayOfStrings.map(line =>
        line.replace(', ', ' ').split(',')
    );
    return finalDocArray;
};

export const buildRow = (rowData, isHeader) => {
    if (!rowData) {
        return null;
    } else {
        return (
            <tr>
                {rowData.map((text, idx) => {
                    if (idx === 0 || idx > 3 || text.trim() === '') {
                        return null;
                    } else {
                        return isHeader ? (
                            <th key={`header-${idx}`}>{text}</th>
                        ) : (
                            <td key={`cell-${idx}`}>{text}</td>
                        );
                    }
                })}
            </tr>
        );
    }
};

export const buildTable = data => (
    <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <tbody>{data.map(row => buildRow(row))}</tbody>
        </table>
    </div>
);

export const toDollar = n => {
    const numWithCommas = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${numWithCommas}`;
};

export const constantCase = v => snakeCase(upperCase(v));

export const buildDocumentReducer = currentMonth => (rowArr, currentRow) => {
    const target = currentRow[1];

    if (hasDateInRow(currentRow)) {
        const monthNumber = getMonthNumber(target);
        const currentMonthNumber = Months.indexOf(currentMonth) + 1;
        const sameAsCurrentMonth = monthNumber === currentMonthNumber;

        if (sameAsCurrentMonth) {
            rowArr.push(currentRow);
        }
    }

    return rowArr;
};

export const hasDateInRow = row => row[1] && row[1].includes('/');

export const getMonthNumber = rowArr =>
    Array.isArray(rowArr) &&
    typeof rowArr[1] === 'string' &&
    rowArr[1].includes('/')
        ? numeral(rowArr[1].split('/')[0]).value()
        : 0;
