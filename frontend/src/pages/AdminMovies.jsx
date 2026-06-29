import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../components/admin/AdminLayout";
import MovieTable from "../components/admin/MovieTable";
import MovieForm from "../components/admin/MovieForm";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
  const handleSubmitMovie = async (movieData) => {
  try {
    if (selectedMovie) {
      // Edit existing movie
      await axios.put(
        `${import.meta.env.VITE_API_URL}/movies/${selectedMovie._id}`,
        movieData
      );
    } else {
      // Add new movie
      await axios.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        movieData
      );
    }

    fetchMovies();

    setShowForm(false);
    setSelectedMovie(null);
  } catch (error) {
    console.error("Failed to save movie:", error);
  }
};

const handleDeleteMovie = async (movieId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this movie?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/movies/${movieId}`
    );

    fetchMovies();
  } catch (error) {
    console.error("Failed to delete movie:", error);
  }
};

const handleEditMovie = (movie) => {
  setSelectedMovie(movie);
  setShowForm(true);
};

const handleAddClick = () => {
  setSelectedMovie(null);
  setShowForm(true);
};

const handleCloseForm = () => {
  setSelectedMovie(null);
  setShowForm(false);
};

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Movies
          </h1>

          <button
  onClick={showForm ? handleCloseForm : handleAddClick}
  className=" bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
>
  {showForm ? "Close Form" : "+ Add Movie"}
</button>
        </div>

        {showForm && (
  <MovieForm
  movie={selectedMovie}
  onSubmit={handleSubmitMovie}
/>
)}

<MovieTable
  movies={movies}
  onDelete={handleDeleteMovie}
  onEdit={handleEditMovie}
/>
      </div>
    </AdminLayout>
  );
};

export default AdminMovies;
