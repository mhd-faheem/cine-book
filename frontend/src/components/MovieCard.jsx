import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} className="movie-card">
      <img src={movie.poster} alt={movie.title} />

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>

        <p className="movie-card-meta">
          {movie.language} • {movie.certification}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;