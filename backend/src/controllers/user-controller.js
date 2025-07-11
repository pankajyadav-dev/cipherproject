const  userService  = require('../service/user-service');
const InputValidatorException = require('../exceptions/inputValidatorException');
const User = require('../models/user');
const addNewUser = async (req, res) => {
    try {
        const {firstname, lastname, email, password, type} = req.body;
        let user = {firstname, lastname, email, password , type};
        const result = await userService.addNewUser(user);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await userService.loginUser(email, password);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

const logoutUser = async (req, res) => {
    try {
        const { token, user } = req;
        // Remove the current token from user's tokens array
        user.tokens = user.tokens.filter((usertoken) => {
            return usertoken.token !== token;
        });
        await user.save();
        return res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

const verifyUser = async (req, res) => {
    try {
        const { user } = req;
        return res.status(200).send({ 
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                type: user.type
            }
        });
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message : error.message});
    }
};
module.exports = {
    addNewUser,
    loginUser,
    logoutUser,
    verifyUser
};
