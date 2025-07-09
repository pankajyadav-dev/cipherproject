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
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            return parsedUser.type;
        }
        return null;
    };
const signupUserFunction = async (userData) => {
    // Transform camelCase to lowercase for backend compatibility
    const transformedData = {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
        type: userData.type === 'STUDENT' ? 'USER' : userData.type === 'LIBRARIAN' ? 'ADMIN' : userData.type
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
    const response = await logoutuser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response;
};

const isAuthenticated = () => {
    return getToken() !== null;
};

export { getToken, getUser, logoutUserFunction as logoutUser, isAuthenticated, loginUserFunction as loginUser, signupUserFunction as signupUser, getLocalStorageUser };
