import { useState } from "react";
import { loginUser } from "../utils/Authutil";
import { useNavigate, Link } from "react-router-dom";

const LoginScreen = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    
    const handleloginSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if(!validateCredentials()) {
            return;
        }
        
        setLoading(true);
        try {
            const user = await loginUser(credentials);
            console.log("Login successful", user);
            navigator("/");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }
    
    const validateCredentials = () => {
        if (!credentials.email || credentials.email.length === 0) {
            setError("Email is required");
            return false;
        }
        if (!credentials.password || credentials.password.length === 0) {
            setError("Password is required");
            return false;
        }
        return true;
    };
    
    return(
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '50px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '450px',
                animation: 'slideInUp 0.6s ease-out'
            }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '10px'
                    }}>
                        📚 Library Pro
                    </div>
                    <h2 style={{ 
                        margin: '0 0 10px 0', 
                        color: '#2c3e50',
                        fontWeight: '600'
                    }}>
                        Welcome Back!
                    </h2>
                    <p style={{ 
                        color: '#7f8c8d', 
                        margin: '0 0 20px 0',
                        fontSize: '1.1rem'
                    }}>
                        Sign in to access your library account
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-message" style={{ marginBottom: '20px' }}>
                        <i className="exclamation triangle icon"></i>
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form className="ui form" onSubmit={handleloginSubmit}>
                    <div className="field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="mail icon"></i>
                            Email Address
                        </label>
                        <div className="ui left icon input" style={{ width: '100%' }}>
                            <i className="mail icon"></i>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email address" 
                                value={credentials.email} 
                                required={true} 
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
                            />
                        </div>
                    </div>
                    
                    <div className="field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="lock icon"></i>
                            Password
                        </label>
                        <div className="ui left icon input" style={{ width: '100%' }}>
                            <i className="lock icon"></i>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                value={credentials.password} 
                                required 
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                            />
                        </div>
                    </div>
                    
                    <button 
                        className="ui primary button fluid" 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            marginTop: '20px',
                            padding: '15px',
                            fontSize: '1.1rem',
                            fontWeight: '600'
                        }}
                    >
                        {loading ? (
                            <>
                                <i className="spinner loading icon"></i>
                                Signing you in...
                            </>
                        ) : (
                            <>
                                <i className="sign in icon"></i>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Section */}
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: '30px',
                    padding: '20px 0',
                    borderTop: '1px solid #e1e8ed'
                }}>
                    <p style={{ color: '#7f8c8d', margin: '0 0 15px 0' }}>
                        Don't have an account?
                    </p>
                    <Link 
                        to="/signup" 
                        className="ui button basic"
                        style={{
                            borderRadius: '25px',
                            padding: '12px 24px',
                            fontWeight: '500'
                        }}
                    >
                        <i className="user plus icon"></i>
                        Create New Account
                    </Link>
                </div>

                
            </div>
        </div>
    );
};
  
export default LoginScreen;