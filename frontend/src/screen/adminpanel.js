import { useEffect, useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { getPendingRequests, approveBookRequest, verifyReturn } from '../api/user-api';

const AdminPanel = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState({});
    const [filter, setFilter] = useState('all'); 

    const fetchPendingRequests = useCallback(async () => {
    try {
        setLoading(true);
        setError('');
        const requests = await getPendingRequests(filter);
        setPendingRequests(requests);
    } catch (error) {
        setError('Failed to load pending requests. Please try again.');
    } finally {
        setLoading(false);
    }
}, [filter]); 


    useEffect(() => {
    fetchPendingRequests();
}, [fetchPendingRequests]); // ✅ no ESLint warning now


    const handleApproveRequest = async (transactionId, action, comments = '') => {
        try {
            setActionLoading(prev => ({ ...prev, [transactionId]: true }));
            await approveBookRequest(transactionId, action, comments);
            
            await fetchPendingRequests(); // Refresh the list
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to process request. Please try again.';
            alert(errorMessage);
        } finally {
            setActionLoading(prev => ({ ...prev, [transactionId]: false }));
        }
    };

    const handleVerifyReturn = async (transactionId, comments = '') => {
        try {
            setActionLoading(prev => ({ ...prev, [transactionId]: true }));
            await verifyReturn(transactionId, comments);
            await fetchPendingRequests(); // Refresh the list
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to verify return. Please try again.';
            alert(errorMessage);
        } finally {
            setActionLoading(prev => ({ ...prev, [transactionId]: false }));
        }
    };

    if (loading) {
        return (
            <section className="app-section">
                <h1>Librarian Admin Panel</h1>
                <p>Loading pending requests...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="app-section">
                <h1>Librarian Admin Panel</h1>
                <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
                <button className="ui button" onClick={fetchPendingRequests}>
                    Try Again
                </button>
            </section>
        );
    }

    return (
        <div className="ui container">
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Librarian Admin Panel</h1>
                <button className="ui button" onClick={fetchPendingRequests}>
                    Refresh
                </button>
            </div>
        <section className="app-section">

            {/* Filter Buttons */}
            <div className="ui three item menu" style={{ marginBottom: '20px' }}>
                <button 
                    className={`item ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Requests ({pendingRequests.length})
                </button>
                <button 
                    className={`item ${filter === 'issue' ? 'active' : ''}`}
                    onClick={() => setFilter('issue')}
                >
                    Issue Requests
                </button>
                <button 
                    className={`item ${filter === 'return' ? 'active' : ''}`}
                    onClick={() => setFilter('return')}
                >
                    Return Requests
                </button>
            </div>

            {pendingRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3>No pending requests</h3>
                    <p>All caught up! No requests waiting for your action.</p>
                </div>
            ) : (
                <div className="ui cards">
                    {pendingRequests.map((request) => (
                        <div key={request._id} className="card" style={{ width: '100%', marginBottom: '15px' }}>
                            <div className="content">
                                <div className="header">
                                    {request.transactionType === 'REQUEST' ? '📚 Book Issue Request' : '🔄 Book Return Request'}
                                </div>
                                <div className="meta">
                                    <span>
                                        Student: {request.studentId.firstname} {request.studentId.lastname}
                                    </span>
                                    <span style={{ marginLeft: '10px' }}>
                                        Email: {request.studentId.email}
                                    </span>
                                </div>
                                <div className="description">
                                    <p><strong>Book:</strong> {request.bookId.title} by {request.bookId.author}</p>
                                    <p><strong>ISBN:</strong> {request.bookId.isbn}</p>
                                    <p><strong>Quantity:</strong> {request.quantity}</p>
                                    <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="extra content">
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {request.transactionType === 'REQUEST' ? (
                                        // Issue Request Actions
                                        <>
                                            <button
                                                className="ui mini green button"
                                                disabled={actionLoading[request._id]}
                                                onClick={() => handleApproveRequest(request._id, 'approve')}
                                            >
                                                {actionLoading[request._id] ? (
                                                    <>
                                                        <i className="spinner loading icon"></i>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="check icon"></i>
                                                        Approve & Issue
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                className="ui mini red button"
                                                disabled={actionLoading[request._id]}
                                                onClick={() => {
                                                    const reason = prompt('Reason for rejection (optional):');
                                                    if (reason !== null) {
                                                        handleApproveRequest(request._id, 'reject', reason);
                                                    }
                                                }}
                                            >
                                                <i className="times icon"></i>
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        // Return Request Actions
                                        <button
                                            className="ui mini orange button"
                                            disabled={actionLoading[request._id]}
                                            onClick={() => {
                                                const comments = prompt('Comments about book condition (optional):');
                                                handleVerifyReturn(request._id, comments || '');
                                            }}
                                        >
                                            {actionLoading[request._id] ? (
                                                <>
                                                    <i className="spinner loading icon"></i>
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="checkmark icon"></i>
                                                    Verify Return
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
        </div>
    );
};

export default AdminPanel;
