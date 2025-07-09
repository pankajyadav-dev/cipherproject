const express = require('express');
const bookController = require('../controllers/book-controller');
const authMiddleware = require('../middleware/authmiddleware');
const librarianmiddleware = require('../middleware/librarian-middleware');
const router = express.Router();

router.post('/add',authMiddleware, librarianmiddleware, bookController.addBook);
router.get('/all', authMiddleware, bookController.getAllBooks);

module.exports = router;
