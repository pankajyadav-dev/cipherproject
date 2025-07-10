import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LibrarianHomeScreen = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalStudents: 0,
        pendingRequests: 0,
        issuedBooks: 0
    });

    // You can fetch real stats from your API here
    useEffect(() => {
        // Mock data - replace with actual API calls
        setStats({
            totalBooks: 156,
            totalStudents: 42,
            pendingRequests: 8,
            issuedBooks: 23
        });
    }, []);

    return (
        <div className="fade-in">
            {/* Welcome Header */}
            <div className="professional-header">
                <h1>
                    <i className="fas fa-crown"></i>
                    Welcome, Librarian!
                </h1>
                <p className="subtitle">Manage your library with ease and efficiency</p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stats-card slide-in-left">
                    <div className="stats-icon">
                        <i className="fas fa-book"></i>
                    </div>
                    <div className="stats-number">{stats.totalBooks}</div>
                    <div className="stats-label">Total Books</div>
                </div>
                <div className="stats-card slide-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="stats-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stats-number">{stats.totalStudents}</div>
                    <div className="stats-label">Active Students</div>
                </div>
                <div className="stats-card slide-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="stats-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stats-number">{stats.pendingRequests}</div>
                    <div className="stats-label">Pending Requests</div>
                </div>
                <div className="stats-card slide-in-right" style={{ animationDelay: '0.3s' }}>
                    <div className="stats-icon">
                        <i className="fas fa-handshake"></i>
                    </div>
                    <div className="stats-number">{stats.issuedBooks}</div>
                    <div className="stats-label">Issued Books</div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="ui three cards">
                <div className="card slide-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="content">
                        <div className="header">
                            <i className="fas fa-plus-circle"></i>
                            Add New Book
                        </div>
                        <div className="description">
                            <p>Expand your library collection by adding new books with detailed information including ISBN, author, and availability.</p> 
                            <Link to="/add-book" className="ui button primary">
                                <i className="fas fa-plus"></i>
                                Add Book
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="card slide-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="content">
                        <div className="header">
                            <i className="fas fa-list"></i>
                            Browse Library
                        </div>
                        <div className="description">
                            <p>View and manage all books in your library. Check availability, update information, and monitor book status.</p> 
                            <Link to="/all-books" className="ui button primary">
                                <i className="fas fa-eye"></i>
                                View All Books
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="card slide-in-up" style={{ animationDelay: '0.6s' }}>
                    <div className="content">
                        <div className="header">
                            <i className="fas fa-tasks"></i>
                            Admin Panel
                        </div>
                        <div className="description">
                            <p>Process student requests, approve book issues, handle returns, and manage all library transactions efficiently.</p> 
                            <Link to="/admin-panel" className="ui button green">
                                <i className="fas fa-cog"></i>
                                Manage Requests
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{
                marginTop: '40px',
                padding: '30px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
                <h3 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    <i className="fas fa-rocket"></i>
                    Quick Actions
                </h3>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/add-book" className="ui button orange">
                        <i className="fas fa-plus"></i>
                        Quick Add Book
                    </Link>
                    <Link to="/admin-panel" className="ui button green">
                        <i className="fas fa-bell"></i>
                        View Notifications
                    </Link>
                    <Link to="/all-books" className="ui button blue">
                        <i className="fas fa-search"></i>
                        Search Books
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LibrarianHomeScreen;
