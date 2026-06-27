import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <>
        <Navbar />
        <h2 className="loading">Loading...</h2>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <h2 className="loading">Movie Not Found</h2>
      </>
    );
  }

  return (
    <div className="movie-page">
      <Navbar />
      
        
        <Link to={`/`} className="back-btn">
          ← Back
        </Link>

      {/* Hero Banner */}

      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.9)), url(${movie.banner})`,
        }}
      >
        <div className="hero-container">

          <img
            src={movie.poster}
            alt={movie.title}
            className="poster"
          />

          <div className="movie-info">

            <h1>{movie.title}</h1>

            <div className="rating-box">
              ⭐ {movie.rating}/10
            </div>

            <div className="info-tags">

              <span>{movie.certificate}</span>

              <span>{movie.duration}</span>

              <span>{movie.language}</span>

            </div>

            <div className="genre-list">

              {Array.isArray(movie.genre)
                ? movie.genre.map((g) => (
                    <span key={g}>{g}</span>
                  ))
                : (
                  <span>{movie.genre}</span>
                )}

            </div>

            <p className="release">
              Release Date : {movie.releaseDate}
            </p>

            <button
              className="book-btn"
              onClick={() =>
                navigate(`/movies/${movie._id}/theatres`)
              }
            >
              🎟 Book Tickets
            </button>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="content-card">

        <section>

          <h2>About the Movie</h2>

          <p>{movie.description}</p>

        </section>

        <section>

          <h2>Cast</h2>

          <div className="cast-list">

            {movie.cast?.map((actor, index) => (

              <div className="cast-card" key={index}>

                {typeof actor === "string" ? (
                  <>
                    <div className="dummy-avatar">
                      {actor.charAt(0)}
                    </div>

                    <h4>{actor}</h4>
                  </>
                ) : (
                  <>
                    <img
                      src={actor.image}
                      alt={actor.name}
                      className="cast-image"
                    />

                    <h4>{actor.name}</h4>
                  </>
                )}

              </div>

            ))}

          </div>

        </section>

        <section>

          <h2>Movie Information</h2>

          <div className="movie-grid">

            <div className="info-card">
              <h5>Director</h5>
              <p>{movie.director}</p>
            </div>

            <div className="info-card">
              <h5>Language</h5>
              <p>{movie.language}</p>
            </div>

            <div className="info-card">
              <h5>Duration</h5>
              <p>{movie.duration}</p>
            </div>

            <div className="info-card">
              <h5>Certificate</h5>
              <p>{movie.certificate}</p>
            </div>

            <div className="info-card">
              <h5>Release Date</h5>
              <p>{movie.releaseDate}</p>
            </div>

            <div className="info-card">
              <h5>IMDb Rating</h5>
              <p>⭐ {movie.rating}/10</p>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
};

export default MovieDetails;