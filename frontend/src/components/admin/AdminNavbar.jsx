import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white h-16 px-6 flex items-center justify-between border-b border-zinc-800">
      <h1 className="text-xl font-bold text-red-500">
        CineBook Admin
      </h1>

      <div className="flex items-center gap-6">
        <span className="text-sm">
          Welcome, {user?.name}
        </span>

        <button
  onClick={() => setShowLogoutModal(true)}
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm cursor-pointer"
>
  Logout
</button>
      </div>
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
    </nav>
  );
};

export default AdminNavbar;