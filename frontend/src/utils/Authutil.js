import { loginuser , signupuser} from '../api/user-api';
const getToken = () => {
    return localStorage.getItem('token');
}

const setUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
};
const loginUserFunction = async (email, password) => {
    const data = await loginuser({ email, password });
    if (data && data.token) {
        setUser(data);
    }
    return data.user;
};
const signupUserFunction = async (userData) => {
    const data = await signupuser(userData);
    if (data && data.token) {
        setUser(data);
    }
    return data.user;
};
export { getToken, loginUserFunction as loginUser, signupUserFunction as signupUser };