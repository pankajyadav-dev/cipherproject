import { useState } from 'react';
import { addBook } from '../api/user-api';

const AddBookScreen = () => {
    const [bookDetails, setBookDetails] = useState({
        isbn: '',
        title: '',
        author: '',
        totalQuantity: 1,
        issuedQuantity: 0,
        price: 1
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        // Convert numbers for number inputs
        const processedValue = type === 'number' ? (value === '' ? 0 : Number(value)) : value;
        setBookDetails({ ...bookDetails, [name]: processedValue });
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        // Basic validation
        if (!bookDetails.isbn.trim()) {
            setError('ISBN is required');
            setLoading(false);
            return;
        }
        if (!bookDetails.title.trim()) {
            setError('Title is required');
            setLoading(false);
            return;
        }
        if (!bookDetails.author.trim()) {
            setError('Author is required');
            setLoading(false);
            return;
        }
        if (bookDetails.issuedQuantity > bookDetails.totalQuantity) {
            setError('Issued quantity cannot exceed total quantity');
            setLoading(false);
            return;
        }
        
        try {
            await addBook(bookDetails);
            alert('Book added successfully!');
            setBookDetails({
                isbn: '',
                title: '',
                author: '',
                totalQuantity: 1,
                issuedQuantity: 0,
                price: 1
            });
        } catch (error) {
            console.error('Error adding book:', error);
            const errorMessage = error.response?.data?.message || 'Failed to add book. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="app-section">
            <h1>Add Book</h1>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form className="ui form" onSubmit={handleAddBook}>
                <div className="field">
                    <label>ISBN</label>
                    <input type="text" name="isbn" placeholder="ISBN" value={bookDetails.isbn} onChange={handleInputChange} required />
                </div>
                <div className="field">
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title" value={bookDetails.title} onChange={handleInputChange} required />
                </div>
                <div className="field">
                    <label>Author</label>
                    <input type="text" name="author" placeholder="Author" value={bookDetails.author} onChange={handleInputChange} required />
                </div>
                <div className="field">
                    <label>Total Quantity</label>
                    <input type="number" name="totalQuantity" min="0" step="1" value={bookDetails.totalQuantity} onChange={handleInputChange} required />
                </div>
                <div className="field">
                    <label>Issued Quantity</label>
                    <input type="number" name="issuedQuantity" min="0" step="1" max={bookDetails.totalQuantity} value={bookDetails.issuedQuantity} onChange={handleInputChange} required />
                </div>
                <div className="field">
                    <label>Price</label>
                    <input type="number" name="price" min="1" step="0.01" value={bookDetails.price} onChange={handleInputChange} required />
                </div>
                <button className="ui button" type="submit" disabled={loading}>
                    {loading ? 'Adding Book...' : 'Add Book'}
                </button>
            </form>
        </section>
    );
};

export default AddBookScreen;
