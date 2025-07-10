const express = require('express');
const bookController = require('../controllers/book-controller');
const authMiddleware = require('../middleware/authmiddleware');
const librarianmiddleware = require('../middleware/librarian-middleware');
const router = express.Router();

// Book management
router.post('/add', authMiddleware, librarianmiddleware, bookController.addBook);
router.get('/all', authMiddleware, bookController.getAllBooks);

// Student actions (USER type only)
router.post('/request/:bookId', authMiddleware, bookController.requestBook);
router.post('/return-request/:bookId', authMiddleware, bookController.requestReturn);
router.get('/my-transactions', authMiddleware, bookController.getUserTransactions);

// Librarian actions
router.get('/pending-requests', authMiddleware, librarianmiddleware, bookController.getPendingRequests);
router.put('/approve/:transactionId', authMiddleware, librarianmiddleware, bookController.approveBookRequest);
router.put('/verify-return/:transactionId', authMiddleware, librarianmiddleware, bookController.verifyReturn);

// Test endpoint (remove in production)
router.get('/test-transaction', authMiddleware, bookController.testTransaction);

module.exports = router;
