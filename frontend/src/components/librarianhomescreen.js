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

           
        </div>
    );
};

export default LibrarianHomeScreen;
