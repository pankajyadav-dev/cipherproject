import axios from 'axios';
import { getToken } from '../utils/Authutil';


 const Librarybackend = axios.create({
    baseURL: `http://localhost:8000`,
});

Librarybackend.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { Librarybackend };