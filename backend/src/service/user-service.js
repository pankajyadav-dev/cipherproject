const  User  = require('../models/user');
const inputValidatorException = require('../exceptions/inputValidatorException');
const addNewUser = async (user) => {
    try {
        user = new User(user);
        await user.save();
        const token = await user.generateToken();
        return { user, token };
    } catch (error) {
        throw new inputValidatorException(error.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findByEmailAndPasswordForAuth(email, password);
        const token = await user.generateToken();
        return { user, token };
    } catch (error) {
        throw new inputValidatorException(error.message);
    }
};

module.exports = {
    addNewUser,
    loginUser,
};  