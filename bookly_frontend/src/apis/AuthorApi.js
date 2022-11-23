import { API, JsonConfig, MultipartConfig} from "./API";

export const getAllAuthors = async () => API.get('/authors', JsonConfig);
export const getAuthorById = async (authorId) => API.get(`/authors/${authorId}`, JsonConfig);
export const editAuthor = async (authorId, body) => API.put(`/authors/${authorId}`, body, JsonConfig);
export const addAuthor = async (body) => API.post('/author', body, JsonConfig);
export const deleteAuthor = async (authorId) => API.delete(`/authors/${authorId}`, JsonConfig);

export const addAuthorImage = async (body) => API.post('/author/addimage', body, MultipartConfig);