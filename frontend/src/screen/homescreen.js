import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorageUser, logoutUser } from '../utils/Authutil';
import LibrarianHomeScreen from '../components/librarianhomescreen';
import StudentHomeScreen from '../components/studenthomescreen';

const HomeScreen = ({usertype}) => {
    const [UserType, setUserType] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const userType = getLocalStorageUser();
        if (userType) {
            setUserType(userType);
        }
    }, []);
    
    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            navigate("/login");
        }
    };

    const getHomeScreen = () => {
        if (UserType === 'ADMIN') {
            return <LibrarianHomeScreen />;
        } else if (UserType === 'USER') {
            return <StudentHomeScreen />;
        } else{
            return <div>Loading...</div>;
        }
    };
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div className="professional-container">
                {/* Navigation Bar */}
                {UserType && (
                    <div className="navigation-bar">
                        <div className="nav-brand">
                            <i className="fas fa-book"></i>
                            Library
                        </div>
                        <div className="nav-actions">
                            <div className="user-info">
                                <i className={UserType === 'ADMIN' ? 'fas fa-crown' : 'fas fa-user'}></i>
                                {UserType === 'ADMIN' ? 'Librarian' : 'Student'}
                            </div>
                            <button 
                                className="ui red button" 
                                onClick={handleLogout}
                                style={{ 
                                    borderRadius: '25px',
                                    padding: '10px 20px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Main Content */}
                <div className="app-section" style={{ minHeight: 'auto', padding: '40px' }}>
                    {getHomeScreen()}
                </div>
            </div>
        </div>
    );


};


export default HomeScreen;