import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          onClick={() => {
            logout();
            navigate("/login");
        }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;