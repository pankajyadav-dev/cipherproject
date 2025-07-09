const { model, Schema } = require('mongoose');
const bookSchema = new Schema({
    isbn:{ type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    totalQuantity: { type: Number, required: true , min: 0 , default: 1 },
    issuedQuantity: { type: Number, required: true , min: 0 , default: 0 , Validate: {
        validator(value){
            return this.get('totalQuantity') >= value;
        }
    }},
    price: { type: Number, required: true, min: 1 },
});

const Book = model('Book', bookSchema);

module.exports = Book;