import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.title}</p>
    </Link>
  );
};

export default MovieCard;