const { verifyToken } = require('../jwt');
const InputValidationException = require('../exceptions/input-validation-exception');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new InputValidationException('No token provided');
        const { status, payload } = verifyToken(token);
        if(status){
            const { _id } = payload;
            const user = await User.findById(_id);
            if (!user) {throw new InputValidationException('User not found');}
            else{
                req.user = user;
                req.token = token;
                next();
            }
        }else{
            return res.status(401).send(error.message);
        }
    } catch (error) {
        console.log(error);
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

module.exports = authMiddleware;
