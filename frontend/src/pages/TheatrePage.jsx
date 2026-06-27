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
  const [selectedDate, setSelectedDate] = useState("");

  // Get dates from first theatre
  const dates =
    theatres.length > 0 ? theatres[0].availableDates : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie
        const movieRes = await API.get(`/movies/${id}`);
        setMovie(movieRes.data);

        // Fetch theatres
        const theatreRes = await API.get(`/theatres/movie/${id}`);
        setTheatres(theatreRes.data);

        // Select first available date
        if (
          theatreRes.data.length > 0 &&
          theatreRes.data[0].availableDates &&
          theatreRes.data[0].availableDates.length > 0
        ) {
          setSelectedDate(theatreRes.data[0].availableDates[0]);
        }
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

        <h1 className="movie-title">{movie.title}</h1>

        {/* Date Selector */}
        <div className="date-selector">
          {dates.map((date) => (
            <button
              key={date}
              className={`date-btn ${
                selectedDate === date ? "active-date" : ""
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <p>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <h3>{new Date(date).getDate()}</h3>

              <span>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </span>
            </button>
          ))}
        </div>

        {/* Theatre List */}
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
                            alert(
                              `Movie: ${movie.title}
Date: ${selectedDate}
Theatre: ${theatre.name}
Screen: ${screen.name}
Showtime: ${time}`
                            )
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