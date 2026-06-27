import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-page">
        <Navbar />
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-page">
        <Navbar />
        <h2>Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="movie-details-page">

      <Navbar />

      <Link to="/" className="back-btn text-black mt-5 ml-5">
        &larr; Back
      </Link>

      <div className="movie-details-card">

        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-details-image"
        />

        <div className="movie-details-info">

          <h1>{movie.title}</h1>

          <p className="movie-description">
            {movie.description}
          </p>

          <Link
            to={`/movies/${movie._id}/theatres`}
            className="book-now-btn"
          >
            Book Tickets
          </Link>

        </div>

      </div>

    </div>
  );
};

export default MovieDetails;