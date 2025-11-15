// src/components/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password && userType) {
      setSuccess(true);

      setTimeout(() => {
        if (userType === "admin") {
          navigate("/admin-dashboard");
        } else if (userType === "analyst") {
          navigate("/EConsultationDashboard");
        }
      }, 1500);
    } else {
      alert("Please fill all fields, including user type.");
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-card">
        {/* Left Image Section */}
        <div className="login-left">
          <div className="overlay">
            <h1>Welcome Back!</h1>
            <p>Login to continue your journey.</p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="login-right">
          <div className="back-link">
            <a href="/" className="back-to-site">← Back to Website</a>
          </div>

          <div className="form-container">
            <h2>Sign In</h2>

            {success && (
              <div className="success-box">
                ✅ <span>Login Successful!</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="user-type-select"
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="analyst">Analyst</option>
              </select>

              {/* Remember Me */}
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <button type="submit" className="login-btn">
                Sign In
              </button>
            </form>

            <div className="auth-links">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
