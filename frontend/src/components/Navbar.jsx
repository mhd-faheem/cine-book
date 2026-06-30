import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    alert("Logged out successfully.")
  };

  return (
    <nav className="flex flex-col gap-4 border-b border-zinc-800 bg-black px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">

      <Link to={"/"} className="text-3xl font-extrabold tracking-tight text-red-500">
        CineBook
      </Link>

      <div className="flex flex-wrap items-center gap-3 text-sm sm:justify-end">
        {isAuthenticated ? (
          <>
            <span className="text-zinc-300">
              Welcome, {user?.name}
            </span>

            <Link
              to="/bookings"
              className="rounded-md px-3 py-2 text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              My Bookings
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-500 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-500"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
