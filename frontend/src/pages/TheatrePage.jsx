import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/TheatrePage.css";


const TheatrePage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await API.get(`/movies/${id}`);
        setMovie(movieRes.data);

        const theatreRes = await API.get(`/theatres/movie/${id}`);
        setTheatres(theatreRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="theatre-page">
        <Navbar />
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="theatre-page">
        <Navbar />
        <h2>Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="theatre-page">
      <Navbar />

      <div className="theatre-container">

        <Link to={`/movies/${movie._id}`} className="back-btn">
          ← Back
        </Link>

        <h1 className="movie-title">
          {movie.title}
        </h1>

        <div className="theatre-list">

          {theatres.length === 0 ? (
            <h3>No theatres available.</h3>
          ) : (
            theatres.map((theatre) => (
              <div className="theatre-card" key={theatre._id}>

                <h2>{theatre.name}</h2>

                <p>📍 {theatre.location}</p>

                <p>{theatre.city}</p>

                {theatre.screens.map((screen) => (
                  <div key={screen._id} className="screen-section">

                    <h4>{screen.name}</h4>
<div className="showtimes">
  {screen.shows.map((time) => (
    <button
      key={time}
      className="show-btn"
      onClick={() =>
        alert(`Selected ${theatre.name}\n${screen.name}\n${time}`)
      }
    >
      {time}
    </button>
  ))}
</div>

                  </div>
                ))}

              </div>
            ))
          )}

        </div>

      </div>
    </div>

    
  );
};

export default TheatrePage;