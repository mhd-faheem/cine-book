import { useState } from "react";

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
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid gray",
          padding: "30px",
          width: "350px",
        }}
      >
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

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?
        </p>

        <button onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;