import Navbar from "../components/Navbar";
import "../styles/HomePage.css";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/movies`
        );

        setMovies(response.data);
      } catch (error) {
        console.log("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="loading-container">
          <h2>Loading Movies...</h2>
        </div>
      </>
    );
  }

  return (
    <div className="home-page">
      <Navbar />

      <div className="content-section">

        <div className="home-header">
          <div>
            <h1 className="home-title">Now Showing</h1>

            <p className="home-subtitle">
              Explore the latest movies currently running in theatres.
            </p>
          </div>
        </div>

        <div className="search-box">
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