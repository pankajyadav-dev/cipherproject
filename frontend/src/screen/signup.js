import {useState} from 'react';
import '../App.css';
import { signupUser } from "../utils/Authutil";

const SignUpScreen = () => {
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: false
    });
    const validateCredentials = () => {
        return credentials.firstName?.length > 0 && 
               credentials.lastName?.length > 0 && 
               credentials.email?.length > 0 && 
               credentials.password?.length > 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Sign Up submitted", credentials);
        if(validateCredentials()) {
            const user = await signupUser(credentials);
            if(user.type === "ADMIN"){
                navigator("/admin");
            } else {
                navigator("/user");
            }
            console.log("User registered successfully");
        }

    };  

  return (
    <section className="app-section">
        <h1>Sign Page</h1>
        <span>Already have an account<a href="/login">Login here</a></span>
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
            <input type="checkbox" name="terms" />
        </div>
        <button className="ui button" type="submit">Submit</button>
        </form>
        </section>
  )};


export default SignUpScreen;

