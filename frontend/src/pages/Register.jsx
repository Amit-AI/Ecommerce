import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Register = () => {
    return (
        <div className="login__body">
            <form action="#" className="login__form register__form">
                <h2>Register</h2>
                <div className="inputs">
                    <div>
                        <label htmlFor="email">Username</label><br/>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            spellCheck="false"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label><br/>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            spellCheck="false"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br/>
                        <input
                            type="password"
                            placeholder="password"
                            spellCheck="false"
                            required
                        />
                    </div>
                    <Link className="login__forgotPass" to='/forgotpassword'>forgot password?</Link>
                    <button type="submit">Sign Up</button>
                </div>
                <p>Already a user? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
