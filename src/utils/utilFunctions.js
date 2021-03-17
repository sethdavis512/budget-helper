import Papaparse from 'papaparse';
// import flow from 'lodash/flow';

const fs = require('fs');

export const readFile = path => fs.readFileSync(path, 'utf8');

export const parseDocument = docString =>
    Papaparse.parse(docString, { header: true, dynamicTyping: true });

export const getTransactionsFromDocuments = documentsArr =>
    documentsArr.flatMap(document =>
        document.data.map(row => {
            row.id = getUniqueId('');

            return row;
        })
    );

export const normalizeSpaces = str => (str ? str.replace(/\s\s+/g, ' ') : '');

export const getUniqueId = prefix =>
    `${prefix}${prefix ? '-' : ''}${Math.random().toString(36).substr(2, 9)}`;

export const parseId = id => id.split('-')[1];
