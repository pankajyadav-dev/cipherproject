import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getLocalStorageUser } from '../utils/Authutil';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const authenticated = isAuthenticated();
        const userType = getLocalStorageUser();
        
        // Check if user is authenticated
        if (!authenticated) {
            // Clear any remaining localStorage data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
            return;
        }
        
        // Check if admin access is required
        if (requireAdmin && userType !== 'ADMIN') {
            navigate('/');
            return;
        }
    }, [navigate, requireAdmin]);

    // Only render children if authenticated (and admin if required)
    const authenticated = isAuthenticated();
    const userType = getLocalStorageUser();
    
    if (!authenticated) {
        // Clear any remaining localStorage data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <div>Redirecting to login...</div>;
    }
    
    if (requireAdmin && userType !== 'ADMIN') {
        return <div>Access denied. Redirecting...</div>;
    }

    return children;
};

export default ProtectedRoute;
