import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import ConfirmationModal from "./admin/ConfirmationModal";
import ProfileDrawer from "./ProfileDrawer";

import { FaUserCircle, FaChevronDown } from "react-icons/fa";

const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
  <>
    <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-800 bg-black text-white">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-extrabold text-red-500 tracking-wide hover:text-red-400 transition-colors duration-200"
      >
        CineBook
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-4">

        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            <span className="text-sm text-gray-300">
              👋 Hi,{" "}
              <span className="text-white font-medium">
                {user?.name}
              </span>
            </span>

            <button
  onClick={() => setShowProfile(true)}
  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-700 hover:border-zinc-500 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
>
  <FaUserCircle className="text-base text-gray-300" />
  <span className="font-medium">Profile</span>
  <FaChevronDown className="text-xs text-gray-400" />
</button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <li className="px-5 py-2 rounded-lg border border-zinc-600 text-gray-200 hover:border-red-500 hover:text-white hover:-translate-y-0.5 transition-all duration-200">
                Login
              </li>
            </Link>

            <Link to="/signup">
              <li className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 hover:-translate-y-0.5 shadow-md hover:shadow-red-600/20 transition-all duration-200">
                Sign Up
              </li>
            </Link>
          </>
        )}

      </ul>
    </div>

    <ConfirmationModal
      isOpen={showLogoutModal}
      title="Logout"
      message="Are you sure you want to logout?"
      confirmText="Logout"
      confirmButtonClass="bg-red-600 hover:bg-red-700"
      onCancel={cancelLogout}
      onConfirm={confirmLogout}
    />

    <ProfileDrawer
      isOpen={showProfile}
      onClose={() => setShowProfile(false)}
      user={user}
      onLogout={() => {
        setShowProfile(false);
        handleLogout();
      }}
    />
  </>
);
};

export default Navbar;