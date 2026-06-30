import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [error]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const navigate = useNavigate()

 const handleSignup = async (e) => {
  e.preventDefault();

  // reset messages first
  setError("");
  

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

  // ✅ API CALL (this is what your task wants)
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        name: cleanName,
        email: cleanEmail,
        password,
      }
    );

    console.log(response.data);
    // alert("Signup successful!");
    // alert("Signup successful! Please login.");
    // navigate("/login");
    

    toast.success("Account created successfully! Please login.");
navigate("/login");

    // optional reset
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // optional redirect
    // navigate("/login");

  } catch (error) {
    console.log(error.response?.data);

    setError(
      error.response?.data?.message ||
        "Signup failed"
    );
    toast.error(
  error.response?.data?.message || "Signup failed"
);
  }
};

  return (
  <div className="min-h-screen bg-black text-white">
    {/* Top Navbar */}
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
      <Link
        to="/"
        className="text-3xl font-extrabold text-red-500 hover:text-red-400 transition"
      >
        CineBook
      </Link>

      <Link
        to="/"
        className="text-sm text-gray-300 hover:text-red-500 transition"
      >
        Browse as Guest
      </Link>
    </nav>

    {/* Signup Form */}
    <div className="flex items-center justify-center px-4 py-12">
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
              e.preventDefault();
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
              e.preventDefault();
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
              e.preventDefault();
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-3xl cursor-text"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded-3xl font-semibold cursor-pointer hover:bg-red-700 transition"
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

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white text-sm cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default SignupPage;
