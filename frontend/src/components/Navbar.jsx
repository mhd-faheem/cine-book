import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between p-5 border border-gray-700 items-center text-white bg-black">
      
      {/* Logo */}
      <p className="text-3xl font-extrabold text-red-500">
        CineBook
      </p>

      {/* Nav links */}
      <ul className="flex gap-4 items-center">

        <Link to="/bookings">
          <li>My Bookings</li>
        </Link>

        {/* AUTH UI */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white">
              Welcome, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>

            <Link to="/signup">
              <li>Sign Up</li>
            </Link>
          </>
        )}

      </ul>
    </div>
  );
};

export default Navbar;