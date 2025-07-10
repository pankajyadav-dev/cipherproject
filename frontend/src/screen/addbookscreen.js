import { useState } from 'react';
import { Link } from 'react-router-dom';
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
            setBookDetails({
                isbn: '',
                title: '',
                author: '',
                totalQuantity: 1,
                issuedQuantity: 0,
                price: 1
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add book. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div className="professional-container">
                {/* Navigation Bar */}
                <div className="navigation-bar">
                    <Link to="/" className="nav-brand">
                        <i className="fas fa-book"></i>
                        Library
                    </Link>
                    <div className="nav-actions">
                        <Link to="/" className="ui button basic">
                            <i className="fas fa-arrow-left"></i>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
                
                <div className="app-section slide-in-up">
                    {/* Header */}
                    <div className="professional-header">
                        <h1>
                            <i className="fas fa-plus-circle"></i>
                            Add New Book
                        </h1>
                        <p className="subtitle">Expand your library collection with detailed book information</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle"></i>
                            {error}
                        </div>
                    )}

                    {/* Book Form */}
                    <div style={{
                        background: 'rgba(30, 41, 59, 0.8)',
                        borderRadius: '15px',
                        padding: '40px',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                        marginBottom: '30px',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        backdropFilter: 'blur(15px)'
                    }}>
                        <h3 style={{ 
                            color: '#f8fafc', 
                            marginBottom: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
                        }}>
                            <i className="fas fa-book-open"></i>
                            Book Information
                        </h3>
                        
                        <form className="ui form" onSubmit={handleAddBook}>
                            <div className="two fields">
                                <div className="field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-barcode"></i>
                                        ISBN Number
                                    </label>
                                    <div className="ui left icon input">
                                        <i className="barcode icon"></i>
                                        <input 
                                            type="text" 
                                            name="isbn" 
                                            placeholder="Enter ISBN (e.g., 978-3-16-148410-0)" 
                                            value={bookDetails.isbn} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-tag"></i>
                                        Book Title
                                    </label>
                                    <div className="ui left icon input">
                                        <i className="book icon"></i>
                                        <input 
                                            type="text" 
                                            name="title" 
                                            placeholder="Enter book title" 
                                            value={bookDetails.title} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="field">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fas fa-user-edit"></i>
                                    Author Name
                                </label>
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input 
                                        type="text" 
                                        name="author" 
                                        placeholder="Enter author name" 
                                        value={bookDetails.author} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="three fields">
                                <div className="field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-boxes"></i>
                                        Total Quantity
                                    </label>
                                    <div className="ui left icon input">
                                        <i className="cubes icon"></i>
                                        <input 
                                            type="number" 
                                            name="totalQuantity" 
                                            min="1" 
                                            step="1" 
                                            placeholder="Total copies" 
                                            value={bookDetails.totalQuantity} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-handshake"></i>
                                        Issued Quantity
                                    </label>
                                    <div className="ui left icon input">
                                        <i className="handshake icon"></i>
                                        <input 
                                            type="number" 
                                            name="issuedQuantity" 
                                            min="0" 
                                            step="1" 
                                            max={bookDetails.totalQuantity} 
                                            placeholder="Currently issued" 
                                            value={bookDetails.issuedQuantity} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-dollar-sign"></i>
                                        Price
                                    </label>
                                    <div className="ui left icon input">
                                        <i className="dollar sign icon"></i>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            min="0.01" 
                                            step="0.01" 
                                            placeholder="Book price" 
                                            value={bookDetails.price} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div style={{ 
                                marginTop: '30px', 
                                display: 'flex', 
                                gap: '15px', 
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <button 
                                    className="ui primary button" 
                                    type="submit" 
                                    disabled={loading}
                                    style={{ 
                                        padding: '15px 30px',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <i className="spinner loading icon"></i>
                                            Adding Book...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus"></i>
                                            Add Book to Library
                                        </>
                                    )}
                                </button>
                                <Link to="/" className="ui button secondary">
                                    <i className="fas fa-times"></i>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddBookScreen;
