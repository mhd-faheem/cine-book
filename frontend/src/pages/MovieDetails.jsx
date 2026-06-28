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
      <Link to='/' className='back-btn mt-5 ml-5'>
        &larr; Back
      </Link>

      <div className='movie-details-card'>
        <img src={movie.poster} alt={movie.title} className='movie-details-image' />

        <div className='movie-details-info'>
          <h1>{movie.title}</h1>

          <p className='movie-description'>
            {movie.description}
          </p>

          <p>Language: {movie.language}</p>
          <p>Genre: {movie.genre}</p>
          <p>Duration: {movie.duration}</p>
          <p>Rating: {movie.rating}</p>
          <p>Certification: {movie.certification}</p>

          <Link to={`/movies/${id}/shows`} className='book-now-btn mt-10'>
            Book Tickets
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
