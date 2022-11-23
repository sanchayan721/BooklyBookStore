import { API, JsonConfig, MultipartConfig} from "./API";

export const getAllBooks = async () => API.get('/books', JsonConfig);
export const getBookById = async (bookId) => API.get(`/books/${bookId}`, JsonConfig);
export const editBook = async (bookId, body) => API.put(`/books/${bookId}`, body, JsonConfig);
export const addBook = async (body) => API.post('/book', body, JsonConfig);
export const deleteBook = async (bookId) => API.delete(`/books/${bookId}`, JsonConfig);

export const addCover = async (body) => API.post('/book/addcover', body, MultipartConfig);