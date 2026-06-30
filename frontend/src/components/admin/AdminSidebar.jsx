import { NavLink } from "react-router-dom";
import { FaFilm, FaTachometerAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? "bg-red-600 text-white shadow-md"
        : "text-gray-300 hover:bg-zinc-800 hover:text-white hover:translate-x-1"
    }`;

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-[calc(100vh-64px)]">
      <nav className="p-4 space-y-3">

        <NavLink
          to="/admin"
          end
          className={linkClass}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/movies"
          className={linkClass}
        >
          <FaFilm />
          <span>Movies</span>
        </NavLink>

      </nav>
    </aside>
  );
};

export default AdminSidebar;