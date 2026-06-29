import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import ConfirmationModal from "./admin/ConfirmationModal";

const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
  setShowLogoutModal(true);
};

const confirmLogout = () => {
  logout();
  toast.success("Logged out successfully!");
  navigate("/");
  setShowLogoutModal(false);
};

const cancelLogout = () => {
  setShowLogoutModal(false);
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
  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded cursor-pointer transition"
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
      <ConfirmationModal
  isOpen={showLogoutModal}
  title="Logout"
  message="Are you sure you want to logout?"
  confirmText="Logout"
  confirmButtonClass="bg-red-600 hover:bg-red-700"
  onCancel={cancelLogout}
  onConfirm={confirmLogout}
/>
    </div>
  );
};

export default Navbar;
