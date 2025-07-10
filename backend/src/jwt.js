const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Library'; // Replace with your actual secret key

const generateToken = ({_id , type}) => {
    const token = jwt.sign(
        { _id, type },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
    return token;
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {status: true , decoded};
    } catch (error) {
        return {status: false , error: error.message};
    }
}

module.exports = {
    generateToken,
    verifyToken
};