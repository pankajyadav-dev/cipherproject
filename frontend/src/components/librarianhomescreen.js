import { Link } from 'react-router-dom';
const LibrarianHomeScreen = () => {
    return (
        <div>
            <h1>Welcome.. Librarian </h1>
            <div className="ui three cards">
                <div className="card">
                    <div className="content">
                        <div className="header">Add Book</div>
                        <div className="description">
                            <p>Add new books to the library collection.</p> 
                            <Link to="/add-book" className="ui button primary">Add Book</Link>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="content">
                        <div className="header">View All Books</div>
                        <div className="description">
                            <p>Browse and view all books in the library.</p> 
                            <Link to="/all-books" className="ui button primary">View Books</Link>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="content">
                        <div className="header">Admin Panel</div>
                        <div className="description">
                            <p>Manage book requests and returns from students.</p> 
                            <Link to="/admin-panel" className="ui button green">Manage Requests</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibrarianHomeScreen;
