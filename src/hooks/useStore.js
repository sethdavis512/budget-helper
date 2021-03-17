import { useEffect, useReducer, useRef } from 'react';
import { getMonth, getYear } from 'date-fns';
import numeral from 'numeral';

import {
    mockBudgets,
    mockDocumentData,
    mockFilePaths,
    mockTransactions
} from '../utils/mockData';

const date = new Date();
const currentMonth = getMonth(date);
const currentYear = getYear(date);

export const StoreConstants = {
    BUDGETS: 'budgets',
    CURRENT_MONTH: 'currentMonth',
    CURRENT_YEAR: 'currentYear',
    DOCUMENTS_DATA: 'documentsData',
    FILE_PATHS: 'filePaths',
    TRANSACTIONS: 'transactions'
};

const getInitialState = () => ({
    [StoreConstants.CURRENT_MONTH]: currentMonth,
    [StoreConstants.CURRENT_YEAR]: currentYear,
    [StoreConstants.FILE_PATHS]: mockFilePaths,
    [StoreConstants.DOCUMENTS_DATA]: mockDocumentData,
    [StoreConstants.BUDGETS]: mockBudgets,
    [StoreConstants.TRANSACTIONS]: mockTransactions
});

const ActionTypes = {
    SET_VALUE: 'SET_VALUE',
    ADD_TRANSACTION_TO_BUDGET: 'ADD_TRANSACTION_TO_BUDGET',
    REMOVE_TRANSACTION_FROM_TRANSACTIONS:
        'REMOVE_TRANSACTION_FROM_TRANSACTIONS',
    REMOVE_ALL_TRANSACTIONS_FROM_ALL_BUDGETS:
        'REMOVE_ALL_TRANSACTIONS_FROM_ALL_BUDGETS'
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_VALUE:
            return {
                ...state,
                [payload.targetKey]: payload.data
            };

        case ActionTypes.ADD_TRANSACTION_TO_BUDGET:
            return {
                ...state,
                [StoreConstants.BUDGETS]: state[StoreConstants.BUDGETS].map(
                    (budget, idx) => {
                        if (payload.budgetIndex === idx) {
                            const updatedBudget = {
                                ...budget,
                                [StoreConstants.TRANSACTIONS]: [
                                    ...budget.transactions,
                                    payload.transaction
                                ]
                            };

                            return updatedBudget;
                        }

                        return budget;
                    }
                )
            };

        case ActionTypes.REMOVE_ALL_TRANSACTIONS_FROM_ALL_BUDGETS:
            return {
                ...state,
                [StoreConstants.BUDGETS]: state[StoreConstants.BUDGETS].map(
                    budget => {
                        const updatedBudget = {
                            ...budget,
                            [StoreConstants.TRANSACTIONS]: []
                        };

                        return updatedBudget;
                    }
                )
            };

        case ActionTypes.REMOVE_TRANSACTION_FROM_TRANSACTIONS:
            return {
                ...state,
                [StoreConstants.TRANSACTIONS]: state[
                    StoreConstants.TRANSACTIONS
                ].filter(t => t.id !== payload.transactionId)
            };

        default:
            return state;
    }
};

const useStore = () => {
    const [state, dispatch] = useReducer(reducer, getInitialState());

    const setValue = (targetKey, data) =>
        dispatch({ type: ActionTypes.SET_VALUE, payload: { targetKey, data } });

    const addTransactionToBudget = (transaction, targetIndex) =>
        dispatch({
            type: ActionTypes.ADD_TRANSACTION_TO_BUDGET,
            payload: { transaction, budgetIndex: targetIndex }
        });

    const removeTransactionFromTransactions = transactionId =>
        dispatch({
            type: ActionTypes.REMOVE_TRANSACTION_FROM_TRANSACTIONS,
            payload: { transactionId }
        });

    const removeAllTransactionsFromAllBudgets = () =>
        dispatch({
            type: ActionTypes.REMOVE_ALL_TRANSACTIONS_FROM_ALL_BUDGETS
        });

    const transactionRef = useRef(state[StoreConstants.TRANSACTIONS]);

    useEffect(() => {
        transactionRef.current = state[StoreConstants.TRANSACTIONS];
    }, [state[StoreConstants.FILE_PATHS]]);

    const breakdown = transactionRef.current.reduce(
        (acc, cur) => {
            if (cur['Amount'] > 0) {
                acc.income.add(cur['Amount']);
            } else {
                acc.expenses.add(cur['Amount']);
            }

            return acc;
        },
        {
            income: numeral(0),
            expenses: numeral(0)
        }
    );

    const storeState = {
        ...state,
        transactions: state[StoreConstants.TRANSACTIONS],
        income: breakdown.income.format(),
        expenses: breakdown.expenses.format(),
        difference: breakdown.income.add(breakdown.expenses.value()).format()
    };

    const storeActions = {
        setValue,
        addTransactionToBudget,
        removeTransactionFromTransactions,
        removeAllTransactionsFromAllBudgets
    };

    return [storeState, storeActions];
};

export default useStore;
