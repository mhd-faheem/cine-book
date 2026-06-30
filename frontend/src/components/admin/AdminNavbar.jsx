import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <nav className="bg-zinc-900 text-white h-16 px-6 flex items-center justify-between border-b border-zinc-800">

        <h1 className="text-xl font-bold text-red-500 tracking-wide">
          CineBook Admin
        </h1>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700">
  <FaUserShield className="text-red-500" />
  <span className="text-sm font-medium text-white">
    Admin
  </span>
</div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </nav>

      <ConfirmationModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from the admin dashboard?"
        confirmText="Logout"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          toast.success("Logged out successfully!");
          navigate("/login");
        }}
      />
    </>
  );
};

export default AdminNavbar;