import AdminLayout from "../components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Total Movies */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-gray-400 text-sm">Total Movies</h2>

            <p className="text-4xl font-bold text-white mt-3">
              0
            </p>
          </div>

          {/* Total Bookings */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-gray-400 text-sm">
              Total Bookings
            </h2>

            <p className="text-4xl font-bold text-white mt-3">
              0
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