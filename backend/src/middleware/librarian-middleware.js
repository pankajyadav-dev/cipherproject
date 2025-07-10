const librarianmiddleware = async (req, res, next) => {
    if(req.user.type !== 'ADMIN') {
        return res.status(403).send({ message: 'Access denied. Librarian only.' });
    }
    next();
};

module.exports = librarianmiddleware;