import { Librarybackend } from "./Librarybackend";  


const loginuser = async (email, password) => {
    try {
        const response = await Librarybackend.post('/user/login', { email, password });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};


const signupuser = async (userData) => {
    try {
        const response = await Librarybackend.post('/user/signup', userData);
        return response.data;
    } catch (error) {
        console.error("Signup failed:", error);
        throw error;
    }
};


export { loginuser, signupuser };