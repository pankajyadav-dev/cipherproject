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
            console.error('Logout failed:', error);
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
        <section className="ui container">
            {UserType && (
                <div style={{ textAlign: 'right', padding: '10px' }}>
                    <button 
                        className="ui secondary button" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
            {getHomeScreen()}
        </section>
    );


};


export default HomeScreen;