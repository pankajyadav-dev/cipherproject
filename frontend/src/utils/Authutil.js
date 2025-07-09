import { loginuser , signupuser} from '../api/user-api';
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
const signupUserFunction = async (userData) => {
    // Transform camelCase to lowercase for backend compatibility
    const transformedData = {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
        type: userData.type === 'STUDENT' ? 'USER' : userData.type
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

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const isAuthenticated = () => {
    return getToken() !== null;
};

export { getToken, getUser, logout, isAuthenticated, loginUserFunction as loginUser, signupUserFunction as signupUser };
