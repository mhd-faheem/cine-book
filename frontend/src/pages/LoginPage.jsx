import { useState, useRef } from "react";
import "../styles/LoginPage.css";


function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const handleLogin = () => {
  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  setError("");

  console.log("Login Clicked");
  console.log(email);
  console.log(password);
};

  const handleSignup = () => {
    console.log("Navigate to Signup Page");
  };

  return (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">
      <h1 className="text-red-600 text-4xl font-bold text-center">
        CineBook
      </h1>

      <h2 className="text-white text-center text-2xl mt-4 mb-6">
        Welcome Back
      </h2>

      <div className="mb-4">
        <label className="text-white block mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordRef.current.focus();
            }
          }}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="text-white block mb-2">
          Password
        </label>

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          className="w-full p-3 rounded-2xl bg-zinc-800 text-white"
        />
      </div>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-3xl"
      >
        Login
      </button>

      <div className="text-center mt-5">
        <p className="text-gray-400">
          Don't have an account?
        </p>

        <button
          onClick={handleSignup}
          className="text-red-500 mt-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
);
}

export default LoginPage;