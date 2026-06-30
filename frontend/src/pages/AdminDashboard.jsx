import { useEffect, useState } from "react";
import axios from "axios";
import { FaFilm, FaTicketAlt, FaUsers, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";


import AdminLayout from "../components/admin/AdminLayout";

const AdminDashboard = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
  const shouldShow = sessionStorage.getItem("showAdminWelcome");

  if (shouldShow === "true") {
    const timer = setTimeout(() => {
      toast.success("Welcome back, Admin!", {
        icon: "🛡️",
      });

      sessionStorage.removeItem("showAdminWelcome");
    }, 1800);

    return () => clearTimeout(timer);
  }
}, []);
  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [movieResponse, bookingResponse, userResponse] = await Promise.all([
  axios.get(`${import.meta.env.VITE_API_URL}/movies`),

  axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),

  axios.get(`${import.meta.env.VITE_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
]);

      setMovieCount(movieResponse.data.length);
      setBookingCount(bookingResponse.data.length);
      setUserCount(userResponse.data.length);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);
  return (
  <AdminLayout>
    <div>
      
      <h1 className="text-3xl font-bold text-white mb-8">
        Dashboard
      </h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Total Movies */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">
                Total Movies
              </h2>

              <p className="text-4xl font-bold text-white mt-3 flex items-center">
  {loading ? (
    <FaSpinner className="animate-spin text-gray-500 text-2xl" />
  ) : (
    movieCount
  )}
</p>
            </div>

            <div className="w-14 h-14 rounded-xl bg-red-600/20 flex items-center justify-center">
              <FaFilm className="text-red-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">
                Total Bookings
              </h2>

              <p className="text-4xl font-bold text-white mt-3 flex items-center">
  {loading ? (
    <FaSpinner className="animate-spin text-red-500 text-2xl" />
  ) : (
    bookingCount
  )}
</p>
            </div>

            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <FaTicketAlt className="text-blue-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">
                Total Users
              </h2>

              <p className="text-4xl font-bold text-white mt-3 flex items-center">
  {loading ? (
    <FaSpinner className="animate-spin text-red-500 text-2xl" />
  ) : (
    userCount
  )}
</p>
            </div>

            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <FaUsers className="text-emerald-400 text-2xl" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </AdminLayout>
);
};

export default AdminDashboard;
