import Navbar from "../components/Navbar";
import "../styles/HomePage.css";
import "../styles/SeatSelection.css";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/SearchOutlined";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    setLoading(true);

    try {
      setError("");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies`
      );

      setMovies(response.data);
    } catch (error) {
      console.log("Failed to fetch movies", error);
      setError("Unable to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="booking-dark-page">
        <Navbar />

        <div className="cinema-loader">
          <div className="cinema-loader-screen"></div>
          <div className="cinema-loader-spinner"></div>
          <p className="cinema-loader-title">Loading movies...</p>
          <p className="cinema-loader-text">Getting the latest list</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-dark-page">
        <Navbar />
        <div className="error-state-card">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="error-state-link" onClick={fetchMovies}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar />

      <div className="content-section page-fade-in">

        <div className="home-header">
          <div>
            <h1 className="home-title">Now Showing</h1>

            <p className="home-subtitle">
              Explore the latest movies currently running in theatres.
            </p>
          </div>
        </div>

        <div className="search-box">
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredMovies.length > 0 ? (
          <div className="movie-cards">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No movies found.
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;
