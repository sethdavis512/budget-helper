import ActionTypes from './actionTypes';
import { getMonth } from 'date-fns';

const currentMonth = getMonth(new Date());

export const initialState = {
    currentMonth,
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

        default:
            return state;
    }
};
