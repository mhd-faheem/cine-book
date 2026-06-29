import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate()
  const passwordRef = useRef(null);

  useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [error]);

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    console.log(response.data);

    // 🔥 IMPORTANT: global auth update
    login(response.data);
  
    toast.success("Login successful!");

setEmail("");
setPassword("");

const redirectPath = sessionStorage.getItem("redirectAfterLogin");

if (redirectPath) {
  sessionStorage.removeItem("redirectAfterLogin");
  navigate(redirectPath);
} else if (response.data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/");
}
    // navigate("/");

  } catch (error) {
    console.log(error.response?.data);

    setError(
      error.response?.data?.message || "Login failed"
    );
    toast.error(
  error.response?.data?.message || "Login failed"
);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md pb-4"
      >
        {/* <h1 className="text-red-600 text-4xl font-bold text-center mb-4">
          CineBook
        </h1> */}
        {/* Title (same style as Signup) */}
        <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">
          Welcome Back
        </h2>

        {/* Email */}
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
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
  ref={passwordRef}
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }}
  className="w-full p-3 mb-4 bg-zinc-800 rounded-3xl cursor-text"
/>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded-3xl font-semibold cursor-pointer hover:bg-red-700"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-500 hover:underline cursor-pointer"
          >
            Sign Up
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

export default LoginPage;
