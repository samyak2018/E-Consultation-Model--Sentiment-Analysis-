// src/components/ForgotPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse same styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Simulate password reset
    setMessage("✅ Password reset successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          alt="LeetCode Logo"
          className="logo"
        />
        <h2>Reset Password</h2>

        {message && <div className="success-box">{message}</div>}

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>

        <p className="switch-text">
          Remembered your password? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
