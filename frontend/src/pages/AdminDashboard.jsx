import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../components/admin/AdminLayout";

const AdminDashboard = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

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
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Total Movies */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-gray-400 text-sm">
              Total Movies
            </h2>

            <p className="text-4xl font-bold text-white mt-3">
              {movieCount}
            </p>
          </div>

          {/* Total Bookings */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-gray-400 text-sm">
              Total Bookings
            </h2>

            <p className="text-4xl font-bold text-white mt-3">
              {bookingCount}
            </p>
          </div>

          {/* Total Users */}
<div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
  <h2 className="text-gray-400 text-sm">
    Total Users
  </h2>

  <p className="text-4xl font-bold text-white mt-3">
    {userCount}
  </p>
</div>

          {/*
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-gray-400 text-sm">
              Customers
            </h2>

            <p className="text-4xl font-bold text-white mt-3">
              0
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-gray-400 text-sm">
              Revenue
            </h2>

            <p className="text-4xl font-bold text-white mt-3">
              ₹0
            </p>
          </div>
          */}

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;