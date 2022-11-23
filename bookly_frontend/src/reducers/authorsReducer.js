import { ALL_AUTHORS_CLEAR_SUCCESSFUL, ALL_AUTHORS_LOAD_SUCCESSFUL } from "../actions/types";

const initialState = [];

const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_AUTHORS_LOAD_SUCCESSFUL:
            return [
                ...action.payload
            ];

        case ALL_AUTHORS_CLEAR_SUCCESSFUL:
            return [
                ...initialState
            ];
    
        default:
            return state;
    }
};

export default authorsReducer;
