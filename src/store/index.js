import { getMonth, getYear } from 'date-fns';

const date = new Date();
const currentMonth = getMonth(date);
const currentYear = getYear(date);

export const ActionTypes = {
    SET_CURRENT_MONTH: 'SET_CURRENT_MONTH',
    SET_CURRENT_YEAR: 'SET_CURRENT_YEAR',
    SET_FILE_PATHS: 'SET_FILE_PATHS',
    SET_DOCUMENTS_DATA: 'SET_DOCUMENTS_DATA'
};

export const initialState = {
    currentMonth,
    currentYear,
    filePaths: [],
    documentsData: []
};

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_FILE_PATHS:
            return {
                ...state,
                filePaths: payload.filePaths
            };

        case ActionTypes.SET_DOCUMENTS_DATA:
            return {
                ...state,
                documentsData: payload.documentsData
            };

        case ActionTypes.SET_CURRENT_MONTH:
            return {
                ...state,
                currentMonth: payload.currentMonth
            };

        case ActionTypes.SET_CURRENT_YEAR:
            return {
                ...state,
                currentYear: payload.currentYear
            };

        default:
            return state;
    }
};
