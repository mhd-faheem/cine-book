import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import API from "../api/api";
import "../styles/HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <h2 className="text-center mt-10">Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="content-section p-2">
        <p className="text-2xl font-bold mb-6">
          Recommended Movies
        </p>

        <div className="movie-cards flex gap-3 flex-wrap">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;