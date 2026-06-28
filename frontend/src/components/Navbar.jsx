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
    <div className="flex flex-row justify-between p-5 border border-gray-700 items-center text-white bg-black">

      {/* Logo */}
      <Link to={"/"} className="text-3xl font-extrabold text-red-500">
        CineBook
      </Link>

      {/* Navigation */}
      <ul className="flex gap-4 items-center">

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span>
              Welcome, {user?.name}
            </span>

        {isAuthenticated && (
          <Link to="/bookings">
            <li>My Bookings</li>
          </Link>
        )}

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
