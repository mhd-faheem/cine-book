import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../components/admin/AdminLayout";
import MovieTable from "../components/admin/MovieTable";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/movies`
        );

        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">
          Movies
        </h1>

        <MovieTable movies={movies} />
      </div>
    </AdminLayout>
  );
};

export default AdminMovies;
