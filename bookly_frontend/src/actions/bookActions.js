import { addCover, addBook, getBookById, editBook, getAllBooks, deleteBook } from '../apis/BookApi'
import { returnErrors } from './errorActions'
import {
    BOOK_COVER_ADD_FAILED,
    BOOK_COVER_ADD_SUCCESSFUL,
    BOOK_COVER_REMOVE_FAILURE,
    BOOK_COVER_REMOVE_SUCCESSFUL,
    BOOK_ADD_SUCCESSFUL,
    BOOK_ADD_FAILURE,
    BOOK_LOAD_SUCCESSFUL,
    BOOK_LOAD_FAILURE,
    CLEAR_BOOK_CACHE,
    BOOK_EDIT_SUCCESSFUL,
    ADDING_AUTHOR_TO_BOOK_SUCCESS,
    ADDING_AUTHOR_TO_BOOK_FAILURE,
    MODIFYING_AUTHORS_IN_ONE_BOOK_SUCCESS,
    MODIFYING_AUTHORS_IN_ONE_BOOK_FAILURE,
    ALL_BOOKS_LOAD_SUCCESSFUL,
    ALL_BOOKS_LOAD_FAILURE,
    ALL_BOOKS_CLEAR_SUCCESSFUL,
    ALL_BOOKS_CLEAR_FAILURE,
    BOOK_DELETE_SUCCESSFUL,
    BOOK_DELETE_FAILURE
} from './types'

export const loadAllBooks = () => async (dispatch) => {
    getAllBooks()
        .then((response) => {
            dispatch({
                type: ALL_BOOKS_LOAD_SUCCESSFUL,
                payload: response.data
            })
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                ALL_BOOKS_LOAD_FAILURE
            ))
        })
};

export const clearAllAuthors = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_BOOKS_CLEAR_SUCCESSFUL
        })
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            ALL_BOOKS_CLEAR_FAILURE
        ))
    }
};


export const addBookCover = (body) => async (dispatch) => {
    addCover(body)
        .then(response => {
            dispatch({
                type: BOOK_COVER_ADD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                BOOK_COVER_ADD_FAILED
            ));
        })
};

export const removeBookCover = () => async (dispatch) => {
    try {
        dispatch({
            type: BOOK_COVER_REMOVE_SUCCESSFUL
        });
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            BOOK_COVER_REMOVE_FAILURE
        ));
    }
};

export const addBookToDatabase = (body) => async (dispatch) => {
    addBook(body)
        .then((response) => {
            dispatch({
                type: BOOK_ADD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                BOOK_ADD_FAILURE
            ))
        })
};

export const loadBook = (bookId) => async (dispatch) => {
    getBookById(bookId)
        .then((response) => {
            dispatch({
                type: BOOK_LOAD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                BOOK_LOAD_FAILURE
            ));
        })
};

export const clearBookCache = () => async (dispatch) => {
    dispatch({
        type: CLEAR_BOOK_CACHE
    })
};

export const editSpecificBook = (bookId, body) => async (dispatch) => {
    editBook(bookId, body)
        .then((response) => {
            dispatch({
                type: BOOK_EDIT_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                BOOK_LOAD_FAILURE
            ));
        })
};

export const addAuthorInBook = (author) => async (dispatch) => {
    try {
        dispatch({
            type: ADDING_AUTHOR_TO_BOOK_SUCCESS,
            payload: author
        });
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            ADDING_AUTHOR_TO_BOOK_FAILURE
        ));
    }
};

export const modifyAuthorsInOneBook = (authors) => async (dispatch) => {
    try {
        dispatch({
            type: MODIFYING_AUTHORS_IN_ONE_BOOK_SUCCESS,
            payload: authors
        });
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            MODIFYING_AUTHORS_IN_ONE_BOOK_FAILURE
        ));
    }
};

export const deleteBookWithId = (bookId) => async (dispatch) => {
    deleteBook(bookId)
        .then((response) => {
            dispatch({
                type: BOOK_DELETE_SUCCESSFUL,
                payload: response.status
            })
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                BOOK_DELETE_FAILURE
            ))
        })
}