// src/components/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); 
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password && userType) {
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      alert("Please fill all fields, including user type.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          alt="LeetCode Logo"
          className="logo"
        />
        <h2>Sign In</h2>

        {success && (
          <div className="success-box">
            ✅ <span>Success!</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="user-type-select"
          >
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="analyst">Analyst</option>
          </select>

          <button type="submit">Sign In</button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password" className="sentiment-analysis/src/components/ForgotPassword.js">
          Forgot Password?</Link>
          <Link to="/signup" className="sentiment-analysis/src/components/Signup.js">
          Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
