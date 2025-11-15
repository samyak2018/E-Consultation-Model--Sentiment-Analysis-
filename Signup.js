// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const validateUsername = (name) => /^[A-Za-z0-9 _-]+$/.test(name);
  const validatePassword = (pass) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);

  const checkPasswordStrength = (pass) => {
    if (pass.length === 0) return "";
    const hasLetters = /[A-Za-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecial = /[@$!%*?&]/.test(pass);
    if (pass.length < 8) return "Weak";
    if (hasLetters && hasNumbers && hasSpecial && pass.length >= 10)
      return "Strong";
    if ((hasLetters && hasNumbers) || (hasLetters && hasSpecial))
      return "Medium";
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setError(
        "The username must contain only letters, numbers, hyphens, underscores, and spaces."
      );
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include letters, numbers, and at least one special character."
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
    setTimeout(() => navigate("/Login"), 1500);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "Weak":
        return "red";
      case "Medium":
        return "orange";
      case "Strong":
        return "green";
      default:
        return "";
    }
  };

  return (
    <div className="signup-outer-container">
      <div className="signup-card">
        {/* Left Section with Image */}
        <div className="signup-left">
          <div className="overlay">
            <h1>Capturing Moments, Creating Memories</h1>
            <p>Join us and make every memory meaningful.</p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="signup-right">
          <div className="form-container">
            <h2>Create an account</h2>
            <p className="login-text">
              Already have an account? <a href="/login">Log in</a>
            </p>

            {success && (
              <div className="success-box">
                ✅ <span>Registration Successful!</span>
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
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {password && (
                <p
                  className="password-strength"
                  style={{ color: getStrengthColor() }}
                >
                  Password Strength: {passwordStrength}
                </p>
              )}
              {error.includes("Password must be at least 8 characters") && (
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

              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="user-type-select"
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="analyst">Analyst</option>
              </select>

              <div className="terms">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms & Conditions</a>
                </label>
              </div>

              <button type="submit" className="create-btn">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
