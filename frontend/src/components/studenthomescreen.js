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
            <div className="professional-header">
                <h1>
                    <i className="fas fa-graduation-cap"></i>
                    Welcome, Student!
                </h1>
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
                            <p style={{color: 'black'}}>Explore our extensive collection of books. Search by title, author, or category. Request books that interest you and track their availability in real-time.</p>
                            <div style={{ marginTop: '15px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    marginBottom: '15px',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    {/* <span><i className="fas fa-book" style={{ color: '#667eea' }}></i> {stats.totalBooks} Books</span>
                                    <span><i className="fas fa-check" style={{ color: '#11998e' }}></i> {stats.availableBooks} Available</span> */}
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

            

            
        </div>
    );
};

export default StudentHomeScreen;
