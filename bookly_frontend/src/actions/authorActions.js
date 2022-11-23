import { addAuthor, editAuthor, getAuthorById, addAuthorImage, getAllAuthors, deleteAuthor } from '../apis/AuthorApi';
import { returnErrors } from './errorActions';
import {
    AUTHOR_IMAGE_ADD_SUCCESSFUL,
    AUTHOR_IMAGE_ADD_FAILURE,
    AUTHOR_IMAGE_REMOVE_SUCCESSFUL,
    AUTHOR_IMAGE_REMOVE_FAILURE,
    AUTHOR_ADD_SUCCESSFUL,
    AUTHOR_ADD_FAILURE,
    AUTHOR_LOAD_SUCCESSFUL,
    AUTHOR_LOAD_FAILURE,
    CLEAR_AUTHOR_CACHE,
    AUTHOR_EDIT_SUCCESSFUL,
    AUTHOR_EDIT_FAILURE,
    ALL_AUTHORS_LOAD_SUCCESSFUL,
    ALL_AUTHORS_LOAD_FAILURE,
    ALL_AUTHORS_CLEAR_SUCCESSFUL,
    ALL_AUTHORS_CLEAR_FAILURE,
    ADDING_BOOK_TO_AUTHOR_SUCCESS,
    ADDING_BOOK_TO_AUTHOR_FAILURE,
    MODIFYING_BOOKS_IN_ONE_AUTHOR_SUCCESS,
    MODIFYING_BOOKS_IN_ONE_AUTHOR_FAILURE,
    AUTHOR_DELETE_SUCCESSFUL,
    AUTHOR_DELETE_FAILURE
} from './types';

export const loadAllAuthors = () => async (dispatch) => {
    getAllAuthors()
        .then((response) => {
            dispatch({
                type: ALL_AUTHORS_LOAD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                ALL_AUTHORS_LOAD_FAILURE
            ));
        });
};

export const clearAllAuthors = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_AUTHORS_CLEAR_SUCCESSFUL
        })
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            ALL_AUTHORS_CLEAR_FAILURE
        ));
    };
};

export const addAuthorProfileImage = (body) => async (dispatch) => {
    addAuthorImage(body)
        .then((response) => {
            dispatch({
                type: AUTHOR_IMAGE_ADD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                AUTHOR_IMAGE_ADD_FAILURE
            ));
        });
};

export const removeAuthorProfileImage = () => async (dispatch) => {
    try {
        dispatch({
            type: AUTHOR_IMAGE_REMOVE_SUCCESSFUL
        });
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            AUTHOR_IMAGE_REMOVE_FAILURE
        ));
    }
};

export const addAuthorToDatabase = (body) => async (dispatch) => {
    addAuthor(body)
        .then((response) => {
            dispatch({
                type: AUTHOR_ADD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                AUTHOR_ADD_FAILURE
            ));
        });
};

export const loadAuthor = (authorId) => async (dispatch) => {
    getAuthorById(authorId)
        .then((response) => {
            dispatch({
                type: AUTHOR_LOAD_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                AUTHOR_LOAD_FAILURE
            ));
        });
};

export const clearAuthorCache = () => async (dispatch) => {
    dispatch({
        type: CLEAR_AUTHOR_CACHE
    });
};

export const editSpecificAuthor = (authorId, body) => async (dispatch) => {
    console.log(body)
    editAuthor(authorId, body)
        .then((response) => {
            dispatch({
                type: AUTHOR_EDIT_SUCCESSFUL,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                AUTHOR_EDIT_FAILURE
            ));
        });
};

export const addBookInAuthor = (book) => async (dispatch) => {
    try {
        dispatch({
            type: ADDING_BOOK_TO_AUTHOR_SUCCESS,
            payload: book
        });
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            ADDING_BOOK_TO_AUTHOR_FAILURE
        ));
    }
};

export const modifyBooksInOneAuthor = (books) => async (dispatch) => {
    try {
        dispatch({
            type: MODIFYING_BOOKS_IN_ONE_AUTHOR_SUCCESS,
            payload: books
        });
    } catch (error) {
        dispatch(returnErrors(
            error,
            error.status,
            MODIFYING_BOOKS_IN_ONE_AUTHOR_FAILURE
        ));
    }
};

export const deleteAuthorWithId = (authorId) => async (dispatch) => {
    deleteAuthor(authorId)
        .then((response) => {
            dispatch({
                type: AUTHOR_DELETE_SUCCESSFUL,
                payload: response.status
            });
        })
        .catch((error) => {
            dispatch(returnErrors(
                error?.response?.data?.message,
                error?.response?.data?.status,
                AUTHOR_DELETE_FAILURE
            ));
        });
};