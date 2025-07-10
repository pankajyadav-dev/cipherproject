import { listBooks, requestBook, requestReturn, getUserTransactions } from '../api/user-api';
import { useEffect, useState } from 'react';
import { getLocalStorageUser } from '../utils/Authutil';

const TotalBookScreen = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState({});
    const [userTransactions, setUserTransactions] = useState([]);
    const userType = getLocalStorageUser();

    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError('');
            const bookList = await listBooks();
            setBooks(bookList);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to load books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserTransactions = async () => {
        if (userType === 'USER') {
            try {
                const transactions = await getUserTransactions();
                setUserTransactions(transactions || []);
            } catch (error) {
                console.error('Error fetching user transactions:', error);
                setUserTransactions([]); // Set empty array on error
            }
        } else {
            setUserTransactions([]); // Clear transactions for non-users
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchUserTransactions();
    }, [userType]);

    const handleRefresh = () => {
        fetchBooks();
        fetchUserTransactions();
    };

    // For students: Request a book
    const handleRequestBook = async (bookId, title) => {
        try {
            setActionLoading(prev => ({ ...prev, [`request_${bookId}`]: true }));
            const result = await requestBook(bookId, 1);
            
            alert(result.message || `Book request submitted for "${title}"`);
            await fetchUserTransactions(); // Refresh user transactions
        } catch (error) {
            console.error('Error requesting book:', error);
            const errorMessage = error.response?.data?.message || 'Failed to request book. Please try again.';
            alert(errorMessage);
        } finally {
            setActionLoading(prev => ({ ...prev, [`request_${bookId}`]: false }));
        }
    };

    // For students: Request to return a book
    const handleRequestReturn = async (bookId, title) => {
        try {
            setActionLoading(prev => ({ ...prev, [`return_${bookId}`]: true }));
            const result = await requestReturn(bookId);
            
            alert(result.message || `Return request submitted for "${title}"`);
            await fetchUserTransactions(); // Refresh user transactions
        } catch (error) {
            console.error('Error requesting return:', error);
            const errorMessage = error.response?.data?.message || 'Failed to request return. Please try again.';
            alert(errorMessage);
        } finally {
            setActionLoading(prev => ({ ...prev, [`return_${bookId}`]: false }));
        }
    };

    // Helper function to get book status for student
    const getBookStatusForStudent = (bookId) => {
        if (!userTransactions || userTransactions.length === 0 || userType !== 'USER') {
            return 'AVAILABLE';
        }
        
        try {
            // Find pending request
            const pendingRequest = userTransactions.find(t => 
                t.bookId && t.bookId._id === bookId && 
                t.transactionType === 'REQUEST' && 
                t.status === 'PENDING'
            );
            if (pendingRequest) return 'PENDING_REQUEST';
            
            // Find active issue
            const activeIssue = userTransactions.find(t => 
                t.bookId && t.bookId._id === bookId && 
                t.transactionType === 'ISSUE' && 
                t.status === 'APPROVED'
            );
            if (activeIssue) return 'ISSUED';
            
            // Find pending return request
            const pendingReturn = userTransactions.find(t => 
                t.bookId && t.bookId._id === bookId && 
                t.transactionType === 'RETURN_REQUEST' && 
                t.status === 'PENDING'
            );
            if (pendingReturn) return 'PENDING_RETURN';
            
            return 'AVAILABLE';
        } catch (error) {
            console.error('Error in getBookStatusForStudent:', error);
            return 'AVAILABLE';
        }
    };

    if (loading) {
        return (
            <section className="app-section">
                <h1>Total Books</h1>
                <p>Loading books...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="app-section">
                <h1>Total Books</h1>
                <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
                <button className="ui button" onClick={handleRefresh} disabled={loading}>
                    {loading ? 'Retrying...' : 'Try Again'}
                </button>
            </section>
        );
    }

    return (
        <section className="app-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Total Books</h1>
                <button className="ui button" onClick={handleRefresh} disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            <p><strong>Total number of books: {books.length}</strong></p>
            {books.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>No books found in the library.</p>
                    <button className="ui button" onClick={handleRefresh} disabled={loading}>
                        {loading ? 'Loading...' : 'Try Again'}
                    </button>
                </div>
            ) : (
                <div className="ui container" style={{ overflowX: 'auto' }}>
                    <table className="ui very basic celled table" style={{ 
                        fontSize: '14px',
                        minWidth: '900px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <thead>
                            <tr style={{ 
                                backgroundColor: '#f8f9fa',
                                borderBottom: '2px solid #dee2e6'
                            }}>
                                <th className="collapsing" style={{
                                    padding: '15px 10px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>Book Information</th>
                                <th className="center aligned" style={{
                                    padding: '15px 10px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>Availability</th>
                                <th className="center aligned" style={{
                                    padding: '15px 10px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>Status & Price</th>
                                <th className="center aligned" style={{
                                    padding: '15px 10px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => {
                                const totalQty = book.totalQuantity || 0;
                                const issuedQty = book.issuedQuantity !== undefined ? book.issuedQuantity : 0;
                                const availableQty = totalQty - issuedQty;
                                const isAvailable = availableQty > 0;
                                
                                return (
                                    <tr key={book._id || book.id} 
                                        style={{ 
                                            transition: 'all 0.2s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                                            e.currentTarget.style.transform = 'scale(1.01)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '';
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = '';
                                        }}
                                    >
                                        {/* Book Information Column */}
                                        <td style={{ 
                                            width: '35%',
                                            padding: '15px 10px',
                                            verticalAlign: 'top'
                                        }}>
                                            <div className="ui header" style={{ margin: '0 0 8px 0' }}>
                                                <div className="content">
                                                    <h4 style={{ margin: '0', color: '#2185d0' }}>{book.title}</h4>
                                                    <div className="sub header" style={{ fontSize: '13px', color: '#999' }}>
                                                        by {book.author}
                                                    </div>
                                                </div>
                                            </div>
                                            {book.isbn && (
                                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                                    <strong>ISBN:</strong> {book.isbn}
                                                </div>
                                            )}
                                        </td>
                                        
                                        {/* Availability Column */}
                                        <td className="center aligned" style={{ 
                                            width: '25%',
                                            padding: '15px 10px',
                                            verticalAlign: 'middle'
                                        }}>
                                            <div className="ui three column grid" style={{ margin: '0' }}>
                                                <div className="column" style={{ textAlign: 'center', padding: '5px' }}>
                                                    <div className="ui statistic" style={{ margin: '0' }}>
                                                        <div className="value" style={{ fontSize: '1.2em', color: '#2185d0' }}>
                                                            {totalQty}
                                                        </div>
                                                        <div className="label" style={{ fontSize: '10px', color: '#999' }}>
                                                            Total
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column" style={{ textAlign: 'center', padding: '5px' }}>
                                                    <div className="ui statistic" style={{ margin: '0' }}>
                                                        <div className="value" style={{ fontSize: '1.2em', color: '#db2828' }}>
                                                            {issuedQty}
                                                        </div>
                                                        <div className="label" style={{ fontSize: '10px', color: '#999' }}>
                                                            Issued
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column" style={{ textAlign: 'center', padding: '5px' }}>
                                                    <div className="ui statistic" style={{ margin: '0' }}>
                                                        <div className="value" style={{ fontSize: '1.2em', color: isAvailable ? '#21ba45' : '#f2711c' }}>
                                                            {availableQty}
                                                        </div>
                                                        <div className="label" style={{ fontSize: '10px', color: '#999' }}>
                                                            Available
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Status & Price Column */}
                                        <td className="center aligned" style={{ 
                                            width: '15%',
                                            padding: '15px 10px',
                                            verticalAlign: 'middle'
                                        }}>
                                            <div style={{ marginBottom: '8px' }}>
                                                {totalQty === 0 ? (
                                                    <div className="ui red label">
                                                        <i className="close icon"></i>
                                                        No Stock
                                                    </div>
                                                ) : isAvailable ? (
                                                    <div className="ui green label">
                                                        <i className="checkmark icon"></i>
                                                        Available
                                                    </div>
                                                ) : (
                                                    <div className="ui orange label">
                                                        <i className="warning sign icon"></i>
                                                        Out of Stock
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2185d0' }}>
                                                {book.price ? `$${Number(book.price).toFixed(2)}` : 'Price Not Set'}
                                            </div>
                                        </td>
                                        
                                        {/* Actions Column */}
                                        <td className="center aligned" style={{ 
                                            width: '25%',
                                            padding: '15px 10px',
                                            verticalAlign: 'middle'
                                        }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {userType === 'ADMIN' && (
                                                    <div style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>
                                                        Librarian: Use Admin Panel
                                                        <br />to manage requests
                                                    </div>
                                                )}
                                                
                                                {userType === 'USER' && (() => {
                                                    const bookStatus = getBookStatusForStudent(book._id);
                                                    
                                                    switch(bookStatus) {
                                                        case 'PENDING_REQUEST':
                                                            return (
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div className="ui mini yellow label">
                                                                        <i className="clock icon"></i>
                                                                        Request Pending
                                                                    </div>
                                                                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                                                                        Waiting for approval
                                                                    </div>
                                                                </div>
                                                            );
                                                        
                                                        case 'ISSUED':
                                                            return (
                                                                <>
                                                                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                                                                        <div className="ui mini green label">
                                                                            <i className="check icon"></i>
                                                                            Book Issued
                                                                        </div>
                                                                    </div>
                                                                    <button 
                                                                        className="ui mini orange button"
                                                                        disabled={actionLoading[`return_${book._id}`]}
                                                                        onClick={() => handleRequestReturn(book._id, book.title)}
                                                                        style={{ 
                                                                            fontSize: '11px',
                                                                            padding: '6px 8px'
                                                                        }}
                                                                    >
                                                                        {actionLoading[`return_${book._id}`] ? (
                                                                            <>
                                                                                <i className="spinner loading icon"></i>
                                                                                Requesting...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <i className="undo icon"></i>
                                                                                Request Return
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </>
                                                            );
                                                        
                                                        case 'PENDING_RETURN':
                                                            return (
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div className="ui mini orange label">
                                                                        <i className="clock icon"></i>
                                                                        Return Pending
                                                                    </div>
                                                                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                                                                        Hand over to librarian
                                                                    </div>
                                                                </div>
                                                            );
                                                        
                                                        case 'AVAILABLE':
                                                        default:
                                                            return (
                                                                <button 
                                                                    className="ui mini primary button"
                                                                    disabled={!isAvailable || actionLoading[`request_${book._id}`]}
                                                                    onClick={() => handleRequestBook(book._id, book.title)}
                                                                    style={{ 
                                                                        fontSize: '11px',
                                                                        padding: '6px 8px',
                                                                        opacity: (!isAvailable || actionLoading[`request_${book._id}`]) ? 0.6 : 1
                                                                    }}
                                                                >
                                                                    {actionLoading[`request_${book._id}`] ? (
                                                                        <>
                                                                            <i className="spinner loading icon"></i>
                                                                            Requesting...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <i className="plus icon"></i>
                                                                            Request Book
                                                                        </>
                                                                    )}
                                                                </button>
                                                            );
                                                    }
                                                })()}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                    {/* Summary Information */}
                    <div className="ui segment" style={{ 
                        marginTop: '20px',
                        backgroundColor: '#f8f9fa',
                        border: 'none',
                        borderRadius: '8px'
                    }}>
                        <div className="ui three column grid">
                            <div className="column" style={{ textAlign: 'center' }}>
                                <div className="ui statistic">
                                    <div className="value" style={{ fontSize: '1.5em', color: '#2185d0' }}>
                                        {books.length}
                                    </div>
                                    <div className="label" style={{ color: '#666' }}>
                                        Total Books
                                    </div>
                                </div>
                            </div>
                            <div className="column" style={{ textAlign: 'center' }}>
                                <div className="ui statistic">
                                    <div className="value" style={{ fontSize: '1.5em', color: '#21ba45' }}>
                                        {books.filter(book => {
                                            const totalQty = book.totalQuantity || 0;
                                            const issuedQty = book.issuedQuantity !== undefined ? book.issuedQuantity : 0;
                                            return (totalQty - issuedQty) > 0;
                                        }).length}
                                    </div>
                                    <div className="label" style={{ color: '#666' }}>
                                        Available Books
                                    </div>
                                </div>
                            </div>
                            <div className="column" style={{ textAlign: 'center' }}>
                                <div className="ui statistic">
                                    <div className="value" style={{ fontSize: '1.5em', color: '#db2828' }}>
                                        {books.filter(book => {
                                            const totalQty = book.totalQuantity || 0;
                                            const issuedQty = book.issuedQuantity !== undefined ? book.issuedQuantity : 0;
                                            return (totalQty - issuedQty) === 0 && totalQty > 0;
                                        }).length}
                                    </div>
                                    <div className="label" style={{ color: '#666' }}>
                                        Out of Stock
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default TotalBookScreen;
