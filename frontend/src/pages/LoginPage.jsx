import { useState } from "react";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login Clicked");
    console.log(email);
    console.log(password);
  };

  const handleSignup = () => {
    console.log("Navigate to Signup Page");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>CineBook</h1>

        <h2>Welcome Back</h2>

        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="signup-section">
          <p>Don't have an account?</p>

          <button onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;