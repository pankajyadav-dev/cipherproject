import { Link } from 'react-router-dom';
const studentHomeScreen = () => {
    return (
        <div>
            <h1>Student Home Screen</h1>
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <div className="header">All BOOKS</div>
                        <div className="description">
                            <p>Click the button below to view all books in the library.</p> 
                            <Link to="/all-books" className="ui button primary">View Books</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default studentHomeScreen;