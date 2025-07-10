import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StudentHomeScreen = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        availableBooks: 0,
        myRequests: 0,
        issuedToMe: 0
    });

    // You can fetch real stats from your API here
    useEffect(() => {
        // Mock data - replace with actual API calls
        setStats({
            totalBooks: 156,
            availableBooks: 134,
            myRequests: 2,
            issuedToMe: 1
        });
    }, []);

    return (
        <div className="fade-in">
            {/* Welcome Header */}
            <div className="professional-header">
                <h1>
                    <i className="fas fa-graduation-cap"></i>
                    Welcome, Student!
                </h1>
                <p className="subtitle">Discover and explore our extensive library collection</p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stats-card slide-in-left">
                    <div className="stats-icon">
                        <i className="fas fa-book-open"></i>
                    </div>
                    <div className="stats-number">{stats.totalBooks}</div>
                    <div className="stats-label">Total Books</div>
                </div>
                <div className="stats-card slide-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="stats-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stats-number">{stats.availableBooks}</div>
                    <div className="stats-label">Available Now</div>
                </div>
                <div className="stats-card slide-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="stats-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stats-number">{stats.myRequests}</div>
                    <div className="stats-label">My Requests</div>
                </div>
                <div className="stats-card slide-in-right" style={{ animationDelay: '0.3s' }}>
                    <div className="stats-icon">
                        <i className="fas fa-handshake"></i>
                    </div>
                    <div className="stats-number">{stats.issuedToMe}</div>
                    <div className="stats-label">Books I Have</div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="ui two cards">
                <div className="card slide-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="content">
                        <div className="header">
                            <i className="fas fa-search"></i>
                            Browse Library
                        </div>
                        <div className="description">
                            <p>Explore our extensive collection of books. Search by title, author, or category. Request books that interest you and track their availability in real-time.</p>
                            <div style={{ marginTop: '15px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    marginBottom: '15px',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <span><i className="fas fa-book" style={{ color: '#667eea' }}></i> {stats.totalBooks} Books</span>
                                    <span><i className="fas fa-check" style={{ color: '#11998e' }}></i> {stats.availableBooks} Available</span>
                                </div>
                                <Link to="/all-books" className="ui button primary fluid">
                                    <i className="fas fa-eye"></i>
                                    Browse All Books
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card slide-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="content">
                        <div className="header">
                            <i className="fas fa-user-circle"></i>
                            My Activity
                        </div>
                        <div className="description">
                            <p>Keep track of your library activity. View your current book requests, check the status of issued books, and manage your reading history.</p>
                            <div style={{ marginTop: '15px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    marginBottom: '15px',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <span><i className="fas fa-clock" style={{ color: '#f39c12' }}></i> {stats.myRequests} Pending</span>
                                    <span><i className="fas fa-book-reader" style={{ color: '#e74c3c' }}></i> {stats.issuedToMe} Reading</span>
                                </div>
                                <Link to="/all-books" className="ui button green fluid">
                                    <i className="fas fa-history"></i>
                                    View My Activity
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Content */}
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
                    <i className="fas fa-star"></i>
                    Library Features
                </h3>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '20px',
                    textAlign: 'left'
                }}>
                    <div className="feature-card">
                        <i className="fas fa-lightning-bolt icon"></i>
                        <h4>Quick Search</h4>
                        <p>Find books instantly with our powerful search feature.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-mobile-alt icon"></i>
                        <h4>Mobile Friendly</h4>
                        <p>Access your library account from any device, anywhere.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-bell icon"></i>
                        <h4>Smart Notifications</h4>
                        <p>Get notified about book availability and due dates.</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{
                marginTop: '30px',
                textAlign: 'center'
            }}>
                <h4 style={{ color: '#2c3e50', marginBottom: '20px' }}>Quick Actions</h4>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/all-books" className="ui button primary">
                        <i className="fas fa-search"></i>
                        Search Books
                    </Link>
                    <Link to="/all-books" className="ui button orange">
                        <i className="fas fa-list"></i>
                        My Requests
                    </Link>
                    <Link to="/all-books" className="ui button green">
                        <i className="fas fa-book-reader"></i>
                        Currently Reading
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentHomeScreen;
