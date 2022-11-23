import dayjs from "dayjs";
import {
    ADDING_AUTHOR_TO_BOOK_SUCCESS,
    BOOK_ADD_SUCCESSFUL,
    BOOK_COVER_ADD_SUCCESSFUL,
    BOOK_COVER_REMOVE_SUCCESSFUL,
    BOOK_DELETE_SUCCESSFUL,
    BOOK_EDIT_SUCCESSFUL,
    BOOK_LOAD_SUCCESSFUL,
    CLEAR_BOOK_CACHE,
    MODIFYING_AUTHORS_IN_ONE_BOOK_SUCCESS
} from "../actions/types";

const initialState = {
    bookId: '',
    coverImagePath: '',
    title: '',
    language: '',
    volume: '',
    price: '',
    genere: '',
    publisher: '',
    pubdate: dayjs().format('DD MMMM YYYY'),
    binding: '',
    authors: []
};

const bookReducer = (state = initialState, action) => {

    switch (action.type) {
        case BOOK_COVER_ADD_SUCCESSFUL:
            return {
                ...state,
                coverImagePath: action.payload.filePath,
            };

        case BOOK_COVER_REMOVE_SUCCESSFUL:
            return {
                ...state,
                coverImagePath: null,
            };

        case BOOK_ADD_SUCCESSFUL:
            return {
                ...action.payload
            };

        case BOOK_LOAD_SUCCESSFUL:
            return {
                ...action.payload
            };

        case CLEAR_BOOK_CACHE:
            return {
                ...initialState,
                authors: []
            };

        case BOOK_EDIT_SUCCESSFUL:
            return {
                ...action.payload
            };
        
        case ADDING_AUTHOR_TO_BOOK_SUCCESS:
            return {
                ...state,
                authors: [...state.authors, action.payload]
            }
        
        case MODIFYING_AUTHORS_IN_ONE_BOOK_SUCCESS:
            return {
                ...state,
                authors: action.payload
            }
        
        case BOOK_DELETE_SUCCESSFUL: 
            return {
                ...initialState,
                authors: []
            }

        default:
            return state;
    };
};

export default bookReducer;