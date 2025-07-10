const InputValidationException = require('../exceptions/inputValidatorException');
const Book = require('../models/book');
const BookTransaction = require('../models/bookTransaction');
const User = require('../models/user');
const mongoose = require('mongoose');


const addBook = async (req, res, next) => {
    try {
        // Convert string numbers to actual numbers
        const bookData = {
            ...req.body,
            totalQuantity: parseInt(req.body.totalQuantity) || 1,
            issuedQuantity: parseInt(req.body.issuedQuantity) || 0,
            price: parseFloat(req.body.price) || 1
        };
        
        const book = new Book(bookData);
        await book.save();
        return res.status(201).send(book);
    } catch (error) {
        
        // Handle MongoDB validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).send({message: validationErrors.join(', ')});
        }
        
        // Handle duplicate key errors (unique constraint)
        if (error.code === 11000) {
            return res.status(400).send({message: 'Book with this ISBN already exists'});
        }
        
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

const getAllBooks = async (req, res, next) => {
    try {
        const bookList = await Book.find();
        return res.status(200).send(bookList);
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

// Student requests a book
const requestBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const { quantity = 1 } = req.body;
        const studentId = req.user._id;
        
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({message: 'Invalid book ID format'});
        }
        
        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send({message: 'Book not found'});
        }
        
        // Check if student already has a pending request for this book
        const existingRequest = await BookTransaction.findOne({
            bookId,
            studentId,
            transactionType: 'REQUEST',
            status: 'PENDING'
        });
        
        if (existingRequest) {
            return res.status(400).send({message: 'You already have a pending request for this book'});
        }
        
        // Check if student already has this book issued
        const activeIssue = await BookTransaction.findOne({
            bookId,
            studentId,
            transactionType: 'ISSUE',
            status: 'APPROVED'
        });
        
        if (activeIssue) {
            return res.status(400).send({message: 'You already have this book issued'});
        }
        
        // Create book request
        const transactionData = {
            bookId,
            studentId,
            transactionType: 'REQUEST',
            quantity: parseInt(quantity),
            status: 'PENDING'
        };
        
        const transaction = new BookTransaction(transactionData);
        
        await transaction.save();
        
        return res.status(201).send({
            message: `Book request submitted successfully. Waiting for librarian approval.`,
            transaction
        });
    } catch (error) {
        
        // Handle MongoDB validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).send({message: 'Validation error: ' + validationErrors.join(', ')});
        }
        
        // Handle cast errors (invalid ObjectId)
        if (error.name === 'CastError') {
            return res.status(400).send({message: 'Invalid ID format'});
        }
        
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

// Librarian approves and issues book to student
const approveBookRequest = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const { action, comments = '' } = req.body; // action: 'approve' or 'reject'
        const librarianId = req.user._id;
        
        const transaction = await BookTransaction.findById(transactionId)
            .populate('bookId')
            .populate('studentId', 'firstname lastname email');
            
        if (!transaction) {
            return res.status(404).send({message: 'Transaction not found'});
        }
        
        if (transaction.transactionType !== 'REQUEST' || transaction.status !== 'PENDING') {
            return res.status(400).send({message: 'Invalid transaction for approval'});
        }
        
        if (action === 'reject') {
            transaction.status = 'REJECTED';
            transaction.librarianId = librarianId;
            transaction.comments = comments;
            transaction.approvalDate = new Date();
            await transaction.save();
            
            return res.status(200).send({
                message: 'Book request rejected',
                transaction
            });
        }
        
        if (action === 'approve') {
            // Check book availability
            const book = transaction.bookId;
            const availableQuantity = book.totalQuantity - book.issuedQuantity;
            
            if (availableQuantity < transaction.quantity) {
                return res.status(400).send({
                    message: `Only ${availableQuantity} copies available. Cannot approve request.`
                });
            }
            
            // Update book issued quantity
            book.issuedQuantity += transaction.quantity;
            await book.save();
            
            // Update transaction to approved/issued
            transaction.status = 'APPROVED';
            transaction.transactionType = 'ISSUE';
            transaction.librarianId = librarianId;
            transaction.comments = comments;
            transaction.approvalDate = new Date();
            await transaction.save();
            
            return res.status(200).send({
                message: `Book successfully issued to ${transaction.studentId.firstname} ${transaction.studentId.lastname}`,
                transaction
            });
        }
        
        return res.status(400).send({message: 'Invalid action. Use "approve" or "reject"'});
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

// Student requests to return a book
const requestReturn = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const studentId = req.user._id;
        
        // Find the active issue transaction
        const issueTransaction = await BookTransaction.findOne({
            bookId,
            studentId,
            transactionType: 'ISSUE',
            status: 'APPROVED'
        }).populate('bookId');
        
        if (!issueTransaction) {
            return res.status(400).send({message: 'You do not have this book issued'});
        }
        
        // Check if return request already exists
        const existingReturnRequest = await BookTransaction.findOne({
            bookId,
            studentId,
            transactionType: 'RETURN_REQUEST',
            status: 'PENDING'
        });
        
        if (existingReturnRequest) {
            return res.status(400).send({message: 'Return request already submitted'});
        }
        
        // Create return request
        const returnTransaction = new BookTransaction({
            bookId,
            studentId,
            transactionType: 'RETURN_REQUEST',
            quantity: issueTransaction.quantity,
            status: 'PENDING'
        });
        
        await returnTransaction.save();
        
        return res.status(201).send({
            message: 'Return request submitted successfully. Please hand over the book to librarian.',
            transaction: returnTransaction
        });
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

// Librarian verifies and completes book return
const verifyReturn = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const { comments = '' } = req.body;
        const librarianId = req.user._id;
        
        const returnTransaction = await BookTransaction.findById(transactionId)
            .populate('bookId')
            .populate('studentId', 'firstname lastname email');
            
        if (!returnTransaction) {
            return res.status(404).send({message: 'Return transaction not found'});
        }
        
        if (returnTransaction.transactionType !== 'RETURN_REQUEST' || returnTransaction.status !== 'PENDING') {
            return res.status(400).send({message: 'Invalid transaction for return verification'});
        }
        
        // Find and complete the original issue transaction
        const issueTransaction = await BookTransaction.findOne({
            bookId: returnTransaction.bookId._id,
            studentId: returnTransaction.studentId._id,
            transactionType: 'ISSUE',
            status: 'APPROVED'
        });
        
        if (!issueTransaction) {
            return res.status(400).send({message: 'Original issue transaction not found'});
        }
        
        // Update book quantity
        const book = returnTransaction.bookId;
        book.issuedQuantity = Math.max(0, book.issuedQuantity - returnTransaction.quantity);
        await book.save();
        
        // Complete the issue transaction
        issueTransaction.status = 'COMPLETED';
        issueTransaction.completionDate = new Date();
        await issueTransaction.save();
        
        // Update return transaction
        returnTransaction.status = 'COMPLETED';
        returnTransaction.transactionType = 'RETURNED';
        returnTransaction.librarianId = librarianId;
        returnTransaction.comments = comments;
        returnTransaction.returnDate = new Date();
        returnTransaction.completionDate = new Date();
        await returnTransaction.save();
        
        return res.status(200).send({
            message: `Book return verified and completed for ${returnTransaction.studentId.firstname} ${returnTransaction.studentId.lastname}`,
            transaction: returnTransaction
        });
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

// Get pending requests for librarian
const getPendingRequests = async (req, res, next) => {
    try {
        const { type = 'all' } = req.query;
        
        let filter = { status: 'PENDING' };
        
        if (type === 'issue') {
            filter.transactionType = 'REQUEST';
        } else if (type === 'return') {
            filter.transactionType = 'RETURN_REQUEST';
        } else {
            filter.transactionType = { $in: ['REQUEST', 'RETURN_REQUEST'] };
        }
        
        
        const transactions = await BookTransaction.find(filter)
            .populate('bookId', 'title author isbn')
            .populate('studentId', 'firstname lastname email')
            .sort({ createdAt: -1 });

        
        return res.status(200).send(transactions);
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};

// Get user's transactions (for students)
const getUserTransactions = async (req, res, next) => {
    try {
        const studentId = req.user._id;
        
        const transactions = await BookTransaction.find({ studentId })
            .populate('bookId', 'title author isbn')
            .populate('librarianId', 'firstname lastname')
            .sort({ createdAt: -1 });
            
        return res.status(200).send(transactions);
    } catch (error) {
        return res.status(error instanceof InputValidationException ? 400 : 500).send({message: error.message});
    }
};



module.exports = { 
    addBook, 
    getAllBooks, 
    requestBook, 
    approveBookRequest, 
    requestReturn, 
    verifyReturn, 
    getPendingRequests, 
    getUserTransactions
};
