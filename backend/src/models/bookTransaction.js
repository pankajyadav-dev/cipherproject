const { model, Schema } = require('mongoose');

const BookTransactionSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    librarianId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false // Will be set when librarian approves/verifies
    },
    transactionType: {
        type: String,
        enum: ['REQUEST', 'ISSUE', 'RETURN_REQUEST', 'RETURNED'],
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'],
        default: 'PENDING'
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    approvalDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    completionDate: {
        type: Date
    },
    comments: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
}, { timestamps: true });

// Index for efficient queries
BookTransactionSchema.index({ bookId: 1, studentId: 1 });
BookTransactionSchema.index({ status: 1, transactionType: 1 });

const BookTransaction = model('BookTransaction', BookTransactionSchema);
module.exports = BookTransaction;
