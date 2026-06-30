import { Link } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/movies/${movie._id}`} className="movie-card">
      <div className="movie-poster-frame">
        {!imageLoaded && <div className="movie-poster-skeleton"></div>}
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={imageLoaded ? "poster-loaded" : "poster-loading"}
        />
      </div>

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
