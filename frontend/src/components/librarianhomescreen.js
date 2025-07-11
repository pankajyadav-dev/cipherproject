import { Link } from 'react-router-dom';

const LibrarianHomeScreen = () => {


    return (
        <div className="fade-in">
            {/* Welcome Header */}
            <div className="professional-header">
                <h1>
                    <i className="fas fa-crown"></i>
                    Welcome, Librarian!
                </h1>
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
