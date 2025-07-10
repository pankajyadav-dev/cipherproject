const studentMiddleware = async (req, res, next) => {
    if(req.user.type !== 'USER') {
        return res.status(403).send({ message: 'Access denied. Students only.' });
    }
    next();
};

module.exports = studentMiddleware;
