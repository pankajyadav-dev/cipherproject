import { useState } from "react";
import { loginUser } from "../utils/Authutil";
import {useNavigate} from "react-router-dom";
const LoginScreen = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const handleloginSubmit = async (e) => {
        e.preventDefault();
        console.log("Login submitted", credentials);
        if(validateCredentials()) {
           const user = await loginUser(credentials);
           if(user.type === "ADMIN"){
            navigator("/admin");
           }else{
            navigator("/user");
           }
        }
    }
    const validateCredentials = () => {
        return credentials.email?.length  && credentials.password?.length ;
    };
    return(
    <section className="app-section">
    <h1>Login Page</h1>
    <span>Don't have an account? <a href="/signup">Sign Up</a></span>
    <form className="ui form" onSubmit={handleloginSubmit}>
      <div className="field">
        <label>email</label>
        <input type="email" name="email" placeholder="Email" value={credentials.email} required={true} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
      </div>
      <div className="field">
        <label>password</label>
        <input type="password" name="password" placeholder="Password" value={credentials.password} required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      </div>
      <button className="ui button" type="submit">Login</button>
    </form>
    </section>
    )
};
  
export default LoginScreen;