import { Librarybackend } from "./Librarybackend";  


const loginuser = async (email, password) => {
    try {
        const response = await Librarybackend.post('/user/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};


const signupuser = async (userData) => {
    try {
        const response = await Librarybackend.post('/user/signup', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const addBook = async (bookData) => {
    try {
        const response = await Librarybackend.post('/book/add', bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const listBooks = async () => {
    try {
        const response = await Librarybackend.get('/book/all');
        return response.data;
    } catch (error) {
        throw error;
    }
};
const logoutuser = async () => {
    const response = await Librarybackend.get('/user/logout');
    if (response.status === 200) {
    }
    return response;
}

const verifyuser = async () => {
    const response = await Librarybackend.get('/user/verify');
    return response.data;
}

const requestBook = async (bookId, quantity = 1) => {
    try {
        const response = await Librarybackend.post(`/book/request/${bookId}`, { quantity });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const requestReturn = async (bookId) => {
    try {
        const response = await Librarybackend.post(`/book/return-request/${bookId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUserTransactions = async () => {
    try {
        const response = await Librarybackend.get('/book/my-transactions');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getPendingRequests = async (type = 'all') => {
    try {
        const response = await Librarybackend.get(`/book/pending-requests?type=${type}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const approveBookRequest = async (transactionId, action, comments = '') => {
    try {
        const response = await Librarybackend.put(`/book/approve/${transactionId}`, { action, comments });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const verifyReturn = async (transactionId, comments = '') => {
    try {
        const response = await Librarybackend.put(`/book/verify-return/${transactionId}`, { comments });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export  { 
    loginuser, 
    signupuser, 
    logoutuser, 
    verifyuser, 
    addBook, 
    listBooks, 
    requestBook, 
    requestReturn, 
    getUserTransactions, 
    getPendingRequests, 
    approveBookRequest, 
    verifyReturn 
};
