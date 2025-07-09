import { useState } from "react";
import { loginUser } from "../utils/Authutil";
import {useNavigate} from "react-router-dom";
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
        console.log("Login submitted", credentials);
        
        if(!validateCredentials()) {
            return;
        }
        
        setLoading(true);
        try {
            const user = await loginUser(credentials);
            console.log("Login successful", user);
            if(user && user.type === "ADMIN"){
                navigator("/admin");
            } else {
                navigator("/user");
            }
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
    <section className="app-section">
    <h1>Login Page</h1>
    <span>Don't have an account? <a href="/signup">Sign Up</a></span>
    {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
    <form className="ui form" onSubmit={handleloginSubmit}>
      <div className="field">
        <label>email</label>
        <input type="email" name="email" placeholder="Email" value={credentials.email} required={true} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
      </div>
      <div className="field">
        <label>password</label>
        <input type="password" name="password" placeholder="Password" value={credentials.password} required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      </div>
      <button className="ui button" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    </section>
    )
};
  
export default LoginScreen;