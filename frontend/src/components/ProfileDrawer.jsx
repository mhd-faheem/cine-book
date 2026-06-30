import { Link } from "react-router-dom";
import {
  FaTimes,
  FaTicketAlt,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

const ProfileDrawer = ({
  isOpen,
  onClose,
  user,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 bg-zinc-900 text-white shadow-2xl z-50 flex flex-col border-l border-zinc-800">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold tracking-wide">
            Profile
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-zinc-800">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Account
          </p>

          <div className="w-18 h-18 rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h3 className="text-lg font-semibold">
            {user?.name}
          </h3>

          <p className="text-sm text-gray-400 mt-1 break-all">
            {user?.email}
          </p>
        </div>

        {/* Menu */}
        <div className="flex-1 p-6 space-y-3">

          <Link
            to="/bookings"
            onClick={onClose}
            className="group flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <FaTicketAlt className="text-red-500 group-hover:text-red-400 transition-colors" />
              <span className="font-medium">My Bookings</span>
            </div>

            <FaChevronRight className="text-gray-500 group-hover:text-white text-sm transition-colors" />
          </Link>

        </div>

        {/* Logout */}
        <div className="p-6 border-t border-zinc-800">

          <button
            onClick={onLogout}
            className="group w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-800 hover:bg-red-600 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="text-red-500 group-hover:text-white transition-colors" />
              <span className="font-medium text-red-500 group-hover:text-white transition-colors">
                Logout
              </span>
            </div>

            <FaChevronRight className="text-gray-500 group-hover:text-white text-sm transition-colors" />
          </button>

        </div>

      </div>
    </>
  );
};

export default ProfileDrawer;