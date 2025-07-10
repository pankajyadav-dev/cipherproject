import { loginuser , logoutuser, signupuser} from '../api/user-api';
const getToken = () => {
    return localStorage.getItem('token');
}

const setUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
};
const loginUserFunction = async (credentials) => {
    const data = await loginuser(credentials.email, credentials.password);
    if (data && data.token) {
        setUser(data);
    }
    return data.user;
};
const getLocalStorageUser = () => {
    try {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            return parsedUser.type;
        }
        return null;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        // If there's an error parsing, clear the corrupted data
        localStorage.removeItem('user');
        return null;
    }
};
const signupUserFunction = async (userData) => {
    // Transform camelCase to lowercase for backend compatibility
    const transformedData = {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
        type: userData.type // Pass the type as-is since it's already 'USER' or 'ADMIN'
    };
    const data = await signupuser(transformedData);
    if (data && data.token) {
        setUser(data);
    }
    return data.user;
};
const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const logoutUserFunction = async () => {
    try {
        const response = await logoutuser();
        // Clear localStorage after successful backend logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return response;
    } catch (error) {
        // Even if backend logout fails, clear the frontend to prevent access
        console.error('Backend logout failed, clearing frontend anyway:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw error;
    }
};

const isAuthenticated = () => {
    return getToken() !== null;
};

export { getToken, getUser, logoutUserFunction as logoutUser, isAuthenticated, loginUserFunction as loginUser, signupUserFunction as signupUser, getLocalStorageUser };
