import { Link, useParams } from 'react-router-dom'
import '../styles/MovieDetails.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

const MovieDetails = () => {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)

  useEffect(() => {
  const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/${id}`)
        setMovie(response.data)
      } catch (error) {
        console.log("Failed to fetch movie", error)
      }
    }

    fetchMovie()
  }, [id])

  if(!movie){
    return (
      <div>
        <Navbar/>
        <div className='flex justify-center align-middle items-center mt-50'>
          <p className='text-3xl font-bold'>Loading movie details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='movie-details-page'>
      <Navbar/>

      <div className='movie-details-hero'>
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
