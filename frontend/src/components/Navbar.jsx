import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#0f0f0f] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-red-500 tracking-wide"
        >
          CineBook
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          {isAuthenticated ? (
            <>
              <span className="text-gray-300 hidden md:block">
                Hi, <span className="text-white font-semibold">{user?.name}</span>
              </span>

              <Link
                to="/bookings"
                className="text-gray-300 hover:text-white transition"
              >
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;