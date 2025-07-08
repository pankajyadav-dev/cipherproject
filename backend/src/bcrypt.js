const bcrypt = require('bcrypt');

const encryptPassword = async (plainTextPassword) => {
    try {
        const saltRounds = 8; // You can adjust the salt rounds for security
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw error;
    }
}

const checkPasswords = async (plainTextPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

module.exports = {
    encryptPassword,
    checkPasswords
};
