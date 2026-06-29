import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${
      isActive
        ? "bg-red-600 text-white"
        : "hover:bg-zinc-800 text-white"
    }`;

  return (
  <aside className="w-64 bg-zinc-900 text-white min-h-[calc(100vh-64px)] border-r border-zinc-800">
    <nav className="p-4 space-y-3">

      <NavLink
        to="/admin"
        end
        className={linkClass}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/movies"
        className={linkClass}
      >
        Movies
      </NavLink>

      <div className="px-4 py-2 rounded-lg text-gray-500 cursor-not-allowed">
        Bookings
      </div>

      <div className="px-4 py-2 rounded-lg text-gray-500 cursor-not-allowed">
        Theaters
      </div>

    </nav>
  </aside>
);
};

export default AdminSidebar;