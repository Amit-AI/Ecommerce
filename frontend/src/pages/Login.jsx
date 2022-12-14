import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    return (
        <div className="login__body">
            <form action="#" className="login__form">
                <h2>Login</h2>
                <div className="inputs">
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
                            type="text"
                            placeholder="password"
                            spellCheck="false"
                            required
                        />
                    </div>
                    <Link className="login__forgotPass" to='/forgotpassword'>forgot password?</Link>
                    <button type="submit">Log in</button>
                </div>
                <p>New user? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
