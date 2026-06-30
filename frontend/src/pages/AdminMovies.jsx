import { useEffect, useRef, useState } from "react";
import axios from "axios";

import AdminLayout from "../components/admin/AdminLayout";
import MovieTable from "../components/admin/MovieTable";
import MovieForm from "../components/admin/MovieForm";
import ConfirmationModal from "../components/admin/ConfirmationModal";
import toast from "react-hot-toast";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [movieToDelete, setMovieToDelete] = useState(null);
  const formRef = useRef(null);
  
useEffect(() => {
  fetchMovies();
}, []);
  
  const fetchMovies = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies`
    );

    setMovies(response.data);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  } finally {
    setLoading(false);
  }
};

  const handleSubmitMovie = async (movieData) => {
  try {
    if (selectedMovie) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/movies/${selectedMovie._id}`,
        movieData
      );

      toast.success("Movie updated successfully!");
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        movieData
      );

      toast.success("Movie added successfully!");
    }

    fetchMovies();

    setShowForm(false);
    setSelectedMovie(null);
  } catch (error) {
    console.error("Failed to save movie:", error);

    toast.error(
      error.response?.data?.message || "Failed to save movie."
    );
  }
};

const handleDeleteMovie = (movie) => {
  setMovieToDelete(movie);
  setShowDeleteModal(true);
};

const confirmDeleteMovie = async () => {
  if (!movieToDelete) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/movies/${movieToDelete._id}`
    );

    toast.success("Movie deleted successfully!");

    fetchMovies();

    setShowDeleteModal(false);
    setMovieToDelete(null);
  } catch (error) {
    console.error("Failed to delete movie:", error);

    toast.error(
      error.response?.data?.message || "Failed to delete movie."
    );
  }
};

const cancelDeleteMovie = () => {
  setShowDeleteModal(false);
  setMovieToDelete(null);
};

const handleEditMovie = (movie) => {
  setSelectedMovie(movie);
  setShowForm(true);

  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
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
  className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
    showForm
      ? "bg-zinc-700 hover:bg-zinc-600 text-white"
      : "bg-red-600 hover:bg-red-700 text-white"
  }`}
>
  {showForm ? "Cancel" : "+ Add Movie"}
</button>
        </div>

        {showForm && (
  <div ref={formRef}>
    <MovieForm
      movie={selectedMovie}
      onSubmit={handleSubmitMovie}
    />
  </div>
)}

{loading ? (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">
    <p className="text-gray-400 text-lg">
      Loading movies...
    </p>
  </div>
) : (
  <MovieTable
    movies={movies}
    onDelete={handleDeleteMovie}
    onEdit={handleEditMovie}
  />
)}
      </div>

      <ConfirmationModal
  isOpen={showDeleteModal}
  title="Delete Movie"
  confirmText="Delete"
  confirmButtonClass="bg-red-600 hover:bg-red-700"
  onCancel={cancelDeleteMovie}
  onConfirm={confirmDeleteMovie}
>
  <p className="text-gray-300 mb-2">
    Are you sure you want to delete
  </p>

  <p className="text-red-500 font-semibold mb-2">
    "{movieToDelete?.title}"
  </p>

  <p className="text-gray-500 text-sm">
    This action cannot be undone.
  </p>
</ConfirmationModal>
    </AdminLayout>
  );
};

export default AdminMovies;
