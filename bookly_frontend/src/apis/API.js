import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: false
});

export const JsonConfig = {
    headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'application/json',
    }
}

export const MultipartConfig = {
    headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data',
    }
}