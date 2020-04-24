import ActionTypes from './actionTypes';
import { Months } from '../constants';
import { getMonth } from 'date-fns';

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_FILE_PATHS:
            return {
                ...state,
                filePaths: payload.filePaths
            };

        case ActionTypes.SET_TABLES:
            return {
                ...state,
                tableData: payload.tableData
            };

        case ActionTypes.SET_CURRENT_MONTH:
            return {
                ...state,
                currentMonth: payload.currentMonth
            };

        default:
            return state;
    }
};

export const initialState = {
    currentMonth: Months[getMonth(new Date())],
    filePaths: [],
    tableData: []
};
