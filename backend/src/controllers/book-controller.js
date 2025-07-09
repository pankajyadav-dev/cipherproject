const InputValidationException = require('../exceptions/input-validation-exception');
const Book = require('../models/book');


const addBook = async (req, res, next) => {
    try {
        const book = new Book({ ...req.body });
        await book.save();
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

const getAllBooks = async (req, res, next) => {
    try {
        const bookList = await Book.find();
        return res.status(200).send(bookList);
    } catch (error) {
        console.log(error);
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

module.exports = { addBook, getAllBooks };