// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (name) => /^[A-Za-z0-9_-]+$/.test(name);
  const validatePassword = (pass) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setError(
        "The username must contain only letters, numbers, hyphens, and underscores."
      );
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long with letters and numbers (no special characters)."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!userType) {
      setError("Please select a user type.");
      return;
    }

    setError("");
    setSuccess(true);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          alt="LeetCode Logo"
          className="logo"
        />
        <h2>Sign Up</h2>

        {success && (
          <div className="success-box">
            ✅ <span>Success!</span>
          </div>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error.includes("username") && <p className="error">{error}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.includes("Password must be") && (
            <p className="error">{error}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error === "Passwords do not match." && (
            <p className="error">{error}</p>
          )}

          <input
            type="email"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit">Sign Up</button>
        </form>

        <p className="switch-text">
          Have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
