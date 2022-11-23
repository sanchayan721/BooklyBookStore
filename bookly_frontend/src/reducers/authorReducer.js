import { 
    ADDING_BOOK_TO_AUTHOR_SUCCESS, 
    AUTHOR_ADD_SUCCESSFUL, 
    AUTHOR_DELETE_SUCCESSFUL, 
    AUTHOR_EDIT_SUCCESSFUL, 
    AUTHOR_IMAGE_ADD_SUCCESSFUL, 
    AUTHOR_IMAGE_REMOVE_SUCCESSFUL, 
    AUTHOR_LOAD_SUCCESSFUL, 
    CLEAR_AUTHOR_CACHE, 
    MODIFYING_BOOKS_IN_ONE_AUTHOR_SUCCESS 
} from "../actions/types";

const initialState = {
    authorID: '',
    authorImagePath: '',
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    books: []
};

const authorReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case AUTHOR_IMAGE_ADD_SUCCESSFUL:
            return {
                ...state,
                authorImagePath: action.payload.filePath
            };
        
        case AUTHOR_IMAGE_REMOVE_SUCCESSFUL: 
            return {
                ...state,
                authorImagePath: ''
            };
        
        case AUTHOR_ADD_SUCCESSFUL: 
            return {
                ...action.payload
            };
        
        case AUTHOR_LOAD_SUCCESSFUL: 
            return {
                ...action.payload
            };
    
        case CLEAR_AUTHOR_CACHE:
            return {
                ...initialState,
                books: []
            };
        
        case AUTHOR_EDIT_SUCCESSFUL:
            return {
                ...action.payload
            }
        
        case ADDING_BOOK_TO_AUTHOR_SUCCESS:
            return {
                ...state,
                books: [...state.books, action.payload]
            }
        
        case MODIFYING_BOOKS_IN_ONE_AUTHOR_SUCCESS: 
            return {
                ...state,
                books: action.payload
            }

        case AUTHOR_DELETE_SUCCESSFUL: 
            return {
                ...initialState,
                books: []
            }

        default:
            return state;
    };
};

export default authorReducer;