import { useState } from 'react';
import '../App.css';
import { signupUser } from "../utils/Authutil";
import { useNavigate, Link } from "react-router-dom";

const SignUpScreen = () => {
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        type: "USER"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const validateCredentials = () => {
        if (!credentials.firstName || credentials.firstName.length < 3) {
            setError("First name must be at least 3 characters long");
            return false;
        }
        if (!credentials.lastName || credentials.lastName.length < 3) {
            setError("Last name must be at least 3 characters long");
            return false;
        }
        if (!credentials.email || credentials.email.length === 0) {
            setError("Email is required");
            return false;
        }
        if (!credentials.password || credentials.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        if (credentials.password.toLowerCase() === credentials.password || 
            credentials.password.toUpperCase() === credentials.password) {
            setError("Password must contain both uppercase and lowercase letters");
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError("");
        console.log("Sign Up submitted", credentials);
        
        if(!validateCredentials()) {
            return;
        }
        
        setLoading(true);
        try {
            const user = await signupUser(credentials);
            console.log("User registered successfully", user);
                navigator("/");
        } catch (error) {
            console.error("Signup error:", error);
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '20px'
    }}>
        <div style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '50px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            width: '100%',
            maxWidth: '500px',
            animation: 'slideInUp 0.6s ease-out',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            color: '#f8fafc'
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
                    📚 Library
                </div>
                <h2 style={{ 
                    margin: '0 0 10px 0', 
                    color: '#f8fafc',
                    fontWeight: '600',
                    textShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
                }}>
                    Create Your Account
                </h2>
                <p style={{ 
                    color: '#e2e8f0', 
                    margin: '0 0 20px 0',
                    fontSize: '1.1rem'
                }}>
                    Join Library and start managing your books
                </p>
            </div>

            {/* Link to Login */}
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                padding: '15px',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
                <p style={{ margin: '0', color: '#e2e8f0' }}>
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        style={{
                            color: '#6366f1',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Sign in here
                    </Link>
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="error-message" style={{ marginBottom: '25px' }}>
                    <i className="fas fa-exclamation-triangle"></i>
                    {error}
                </div>
            )}

            {/* Signup Form */}
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="two fields">
                    <div className="field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-user"></i>
                            First Name
                        </label>
                        <div className="ui left icon input" style={{ width: '100%' }}>
                            <i className="user icon"></i>
                            <input 
                                type="text" 
                                name="firstname" 
                                placeholder="Enter your first name" 
                                value={credentials.firstName} 
                                required={true} 
                                onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-user"></i>
                            Last Name
                        </label>
                        <div className="ui left icon input" style={{ width: '100%' }}>
                            <i className="user icon"></i>
                            <input 
                                type="text" 
                                name="lastname" 
                                placeholder="Enter your last name" 
                                value={credentials.lastName} 
                                required={true} 
                                onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} 
                            />
                        </div>
                    </div>
                </div>
                
                <div className="field">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-envelope"></i>
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
                        <i className="fas fa-lock"></i>
                        Password
                    </label>
                    <div className="ui left icon input" style={{ width: '100%' }}>
                        <i className="lock icon"></i>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create a strong password" 
                            value={credentials.password} 
                            required={true} 
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                        />
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
                        Password must be at least 6 characters with uppercase and lowercase letters
                    </div>
                </div>
                
                <div className="field">
                    <div style={{ 
                        padding: '15px',
                        background: 'rgba(102, 126, 234, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        position: 'relative'
                    }}>
                        <div className="ui checkbox">
                            <input 
                                type="checkbox" 
                                id="admin-checkbox"
                                name="admin" 
                                tabIndex="0" 
                                onChange={(e) => setCredentials({ ...credentials, type: e.target.checked ? "ADMIN" : "USER" })} 
                            />
                            <label htmlFor="admin-checkbox" style={{ 
                                fontWeight: '600',
                                color: '#f8fafc',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer'
                            }}>
                                <i className="fas fa-crown" style={{ color: '#6366f1', marginLeft: '25px' }}></i>
                                I am a Librarian/Administrator
                            </label>
                        </div>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
                        Check this box if you're registering as a librarian or administrator
                    </div>
                </div>
                
                <button 
                    className="ui primary button fluid" 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        marginTop: '25px',
                        padding: '15px',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                    }}
                >
                    {loading ? (
                        <>
                            <i className="spinner loading icon"></i>
                            Creating Account...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-user-plus"></i>
                            Create Account
                        </>
                    )}
                </button>
            </form>

            
        </div>
    </div>
  )};


export default SignUpScreen;

