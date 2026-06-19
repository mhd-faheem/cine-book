import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState('')

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const navigate = useNavigate()

 const handleSignup = (e) => {
  e.preventDefault();

  // reset messages first
  setError("");
  setMessage("");

  const cleanName = name.trim();
  const cleanEmail = email.trim();

  // 1. Empty check
  if (!cleanName || !cleanEmail || !password || !confirmPassword) {
    setError("All fields are required");
    return;
  }

  // 2. Name validation
  if (cleanName.length < 3) {
    setError("Name must be at least 3 characters");
    return;
  }

  // 3. Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    setError("Enter a valid email address");
    return;
  }

  // 4. Password length
  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  // 5. Password match
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  // SUCCESS
  setMessage("Account created successfully !");

  setName("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md pb-4"
      >
        
        <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">
          Create Account
        </h2>
        


        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              emailRef.current.focus();
            }
          }}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-3xl cursor-text"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          ref={emailRef}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordRef.current.focus();
            }
          }}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-3xl cursor-text"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          ref={passwordRef}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              confirmRef.current.focus();
            }
          }}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-3xl cursor-text"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          ref={confirmRef}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-3xl cursor-text"
        />


        {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
                {error}
            </p>
            )}

        {message && (
            <p className="text-green-500 text-sm mb-3 text-center">
                {message}
            </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded-3xl font-semibold cursor-pointer hover:bg-red-700"
        >
          Sign Up
        </button>
        

        {/* Login Link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
        
        <div className="flex justify-center mt-6">
            <button
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-white text-sm px-3 py-0 cursor-pointer"
  >
                ← Back
            </button>
        </div>

      </form>
    </div>
  );
};

export default SignupPage;