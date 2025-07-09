const  userService  = require('../service/user-service');
const InputValidatorException = require('../exceptions/inputValidatorException');
const addNewUser = async (req, res) => {
    try {
        const {firstname, lastname, email, password, type} = req.body;
        let user = {firstname, lastname, email, password , type};
        const result = await userService.addNewUser(user);
        console.log('Signup successful for user:', result.user.email);
        return res.status(200).send(result);
    } catch (error) {
        console.error('Error adding new user:', error);
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log('=== LOGIN DEBUG ===');
        console.log('Login attempt for email:', email);
        const result = await userService.loginUser(email, password);
        console.log('Login result - Token present:', result.token ? 'YES' : 'NO');
        console.log('Login result - User type:', result.user?.type);
        console.log('=== END LOGIN DEBUG ===');
        return res.status(200).send(result);
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(error instanceof InputValidatorException ? 400 : 500).send({message : error.message});
    }
};

module.exports = {
    addNewUser,
    loginUser,
};  