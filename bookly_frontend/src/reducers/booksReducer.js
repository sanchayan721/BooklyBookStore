import { ALL_BOOKS_CLEAR_SUCCESSFUL, ALL_BOOKS_LOAD_SUCCESSFUL } from "../actions/types";

const initialState = [];

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_BOOKS_LOAD_SUCCESSFUL:
            return [
                ...action.payload
            ];

        case ALL_BOOKS_CLEAR_SUCCESSFUL:
            return [
                ...initialState
            ];
    
        default:
            return state;
    }
};

export default booksReducer;
