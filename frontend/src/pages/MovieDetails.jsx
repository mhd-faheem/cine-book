import { Link, useParams } from 'react-router-dom'
import '../styles/MovieDetails.css'
import '../styles/SeatSelection.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

const MovieDetails = () => {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [error, setError] = useState("")

  const fetchMovie = async () => {
      setMovie(null)

      try {
        setError("")
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/${id}`)
        setMovie(response.data)
      } catch (error) {
        console.log("Failed to fetch movie", error)
        setError("Unable to load movie details. Please try again later.")
      }
    }

  useEffect(() => {
    fetchMovie()
  }, [id])

  if(error){
    return (
      <div className='booking-dark-page'>
        <Navbar/>
        <div className='error-state-card'>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <div className='error-state-actions'>
            <button className='error-state-link' onClick={fetchMovie}>Retry</button>
            <Link to='/' className='error-state-link secondary'>Back to home</Link>
          </div>
        </div>
      </div>
    )
  }

  if(!movie){
    return (
      <div className='booking-dark-page'>
        <Navbar/>
        <div className='cinema-loader'>
          <div className='cinema-loader-screen'></div>
          <div className='cinema-loader-spinner'></div>
          <p className='cinema-loader-title'>Loading movie...</p>
          <p className='cinema-loader-text'>Getting movie details</p>
        </div>
      </div>
    )
  }

  return (
    <div className='movie-details-page'>
      <Navbar/>

      <div className='movie-details-hero page-fade-in'>
        <div className='movie-back-wrap'>
          <Link to='/' className='back-btn'>
            &larr; Back
          </Link>
        </div>

        <div className='movie-details-card'>
          <div className='movie-poster-wrap'>
            <img src={movie.poster} alt={movie.title} className='movie-details-image' />
          </div>

          <div className='movie-details-info'>
            <div className='movie-meta-row'>
              {movie.certification && <span>{movie.certification}</span>}
              {movie.language && <span>{movie.language}</span>}
              {movie.duration && <span>{movie.duration}</span>}
            </div>

            <h1>{movie.title}</h1>

            <div className='movie-rating-row'>
              {movie.rating && <p className='movie-rating'>★ {movie.rating}/10</p>}
              {movie.genre && <p>{movie.genre}</p>}
            </div>

            <p className='movie-description'>
              {movie.description || "No description available."}
            </p>

            {movie.cast?.length > 0 && (
              <div className='cast-section'>
                <h2>Cast</h2>
                <div className='cast-list'>
                  {movie.cast.map((person) => (
                    <div className='cast-member' key={person._id || person.name}>
                      <img src={person.image} alt={person.name} />
                      <p>{person.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to={`/movies/${id}/shows`} className='book-now-btn'>
              Book Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
