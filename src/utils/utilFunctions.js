import React from 'react';
import snakeCase from 'lodash/snakeCase';
import upperCase from 'lodash/upperCase';
import numeral from 'numeral';
import { Months } from '../constants';
import Papaparse from 'papaparse';

const fs = require('fs');

export const readFile = path => fs.readFileSync(path, 'utf8');

export const breakdownDocument = docString => Papaparse.parse(docString);

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

export const getYearNumber = rowArr =>
    Array.isArray(rowArr) &&
    typeof rowArr[1] === 'string' &&
    rowArr[1].includes('/')
        ? numeral(rowArr[1].split('/')[2]).value()
        : 2020;
