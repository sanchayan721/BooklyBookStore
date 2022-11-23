import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import errorReducer from "./errorReducer";
import authorReducer from "./authorReducer";
import authorsReducer from "./authorsReducer";
import booksReducer from "./booksReducer";


export default combineReducers({
    error: errorReducer,
    book: bookReducer,
    books: booksReducer,
    author: authorReducer,
    authors: authorsReducer,
})