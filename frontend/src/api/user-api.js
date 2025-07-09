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

const logoutuser = async () => {
    const response = await Librarybackend.get('/user/logout');
    if (response.status === 200) {
        console.log("User logged out successfully");
    }
    return response;
}
export { loginuser, signupuser, logoutuser };