const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-[calc(100vh-64px)] border-r border-zinc-800">
      <ul className="p-4 space-y-3">
        <li className="bg-red-600 px-4 py-2 rounded-lg font-medium">
          Dashboard
        </li>

        <li className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          Movies
        </li>

        <li className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          Bookings
        </li>

        <li className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          Theaters
        </li>


        <li className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          Users
        </li>

        <li className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          Settings
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;