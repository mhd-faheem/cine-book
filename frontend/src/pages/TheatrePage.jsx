import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import "../styles/TheatrePage.css";

const TheatrePage = () => {
  const { id } = useParams(); // movieId from route

  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await API.get(`/theatres/movie/${id}`);
        setTheatres(res.data);
      } catch (err) {
        console.log("Error fetching theatres:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, [id]);

  if (loading) {
    return <h2 className="loading">Loading theatres...</h2>;
  }

  return (
    <div className="theatre-page">

      <h1 className="page-title">Choose Your Cinema</h1>

      <div className="theatre-grid">

        {theatres.length === 0 ? (
          <p className="no-data">No theatres available</p>
        ) : (
          theatres.map((t) => (
            <div className="theatre-card" key={t._id}>

              <div className="theatre-header">
                <h2>{t.name}</h2>
                <span className="format">{t.format}</span>
              </div>

              <p className="location">📍 {t.location}</p>
              <p className="screen">Screen: {t.screen}</p>

              <div className="showtimes">
                {["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"].map((time) => (
                  <button
                    key={time}
                    className="time-btn"
                    onClick={() =>
                      console.log("Selected:", t.name, time)
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default TheatrePage;