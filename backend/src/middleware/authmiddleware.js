const { verifyToken } = require('../jwt');
const InputValidationException = require('../exceptions/inputValidatorException');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new InputValidationException('No token provided');
        const token = authHeader.replace('Bearer ', '');
        const { status, decoded } = verifyToken(token);
        if (status) {
            const { _id } = decoded;
            const user = await User.findById(_id);
            if (!user) {
                throw new InputValidationException('User not found');
            }
            // Check if token exists in user's tokens array
            if (!user.tokens.some(userToken => userToken.token === token)) {
                throw new InputValidationException('Token not valid - user logged out');
            }
            req.user = user;
            req.token = token;
            next();
        } else {
            return res.status(401).send({ message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({ message: error.message });
    }
};

module.exports = authMiddleware;
