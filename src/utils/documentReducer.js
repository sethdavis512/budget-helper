import sortBy from 'lodash/sortBy';
import numeral from 'numeral';
import { isValid } from 'date-fns';

export const createDocumentReducer = state => (result, currentDocument) => {
    currentDocument.data.forEach(row => {
        const rowDate = new Date(row[1]);
        const isValidDate = isValid(rowDate);

        if (isValidDate) {
            const month = rowDate.getMonth();
            const rowMonth = month + 1;
            const rowYear = rowDate.getFullYear();

            const modifiedCurrentMonth = state.currentMonth + 1;
            const showRow =
                rowMonth === modifiedCurrentMonth &&
                rowYear === state.currentYear;

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
};
