import { useState} from 'react';
import '../App.css';
import { signupUser } from "../utils/Authutil";
import {useNavigate} from "react-router-dom";


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
    <section className="app-section">
        <h1>Sign Page</h1>
        <span>Already have an account<a href="/login">Login here</a></span>
        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
            <label>First Name</label>
            <input type="text" name="firstname" placeholder="First Name" value={credentials.firstName} require={true} onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} />
        </div>
        <div className="field">
            <label>Last Name</label>
            <input type="text" name="lastname" placeholder="Last Name" value={credentials.lastName} require={true} onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} />
        </div>
        <div className="field">
            <label>email</label>
            <input type="email" name="email" placeholder="Email" value={credentials.email} require={true} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
        </div>
        <div className="field">
            <label>password</label>
            <input type="password" name="password" placeholder="Password" value={credentials.password} require={true} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        </div>
        <div className="field">
            <label>Are you Admin of organisation?</label>
            <input type="checkbox" name="admin"  tabIndex="0" onChange={(e) => setCredentials({ ...credentials, type: e.target.checked ? "ADMIN" : "USER" })} />
        </div>
        <button className="ui button" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
        </button>
        </form>
        </section>
  )};


export default SignUpScreen;

