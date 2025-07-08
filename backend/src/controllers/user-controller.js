const  userService  = require('../service/user-service');
const InputValidatorException = require('../exceptions/inputValidatorException');
const addNewUser = async (req, res) => {
    try {
        const {firstname, lastname, email, password, type} = req.body;
        let user = {firstname, lastname, email, password , type};
        user = await userService.addNewUser(user);
        return res.status(200).send(user);
    } catch (error) {
        console.error('Error adding new user:', error);
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userService.loginUser(email, password);
        return res.status(200).send(user);
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

module.exports = {
    addNewUser,
    loginUser,
};  