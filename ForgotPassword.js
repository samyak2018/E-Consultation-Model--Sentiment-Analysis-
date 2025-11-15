// src/components/ForgotPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // Same dark theme CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("⚠️ Please enter your email.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setMessage("✅ Password reset successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="forgot-outer-container">
      <div className="forgot-card">
        {/* Left Section */}
        <div className="forgot-left">
          <div className="overlay">
            <h1>Forgot Password?</h1>
            <p>Reset your password and get back on track.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="forgot-right">
          <div className="back-link">
            <a href="/" className="back-to-site">
              ← Back to Website
            </a>
          </div>

          <div className="form-container">
            <h2>Reset Password</h2>

            {message && <div className="success-box">{message}</div>}

            <form onSubmit={handleReset}>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <button type="submit" className="reset-btn">
                Reset Password
              </button>

              <button
                type="button"
                className="back-login-btn"
                onClick={() => navigate("/login")}
              >
                ← Go Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
