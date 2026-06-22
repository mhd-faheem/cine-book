import React from 'react'
import { Link, useParams } from 'react-router-dom'
import movies from '../data/movies.js'
import '../styles/MovieDetails.css'
import Navbar from '../components/Navbar.jsx'

const MovieDetails = () => {
  const { id } = useParams()

  const movie = movies.find((movie) => movie.id === Number(id))

  if (!movie) {
    return <p>Movie not found</p>
  }

  return (
    
    
    <div className='movie-details-page'>
        
    <Navbar/>
      <Link to='/' className='back-btn mt-5 ml-5'>
        &larr; Back
      </Link>

      <div className='movie-details-card'>
        <img src={movie.image} alt={movie.title} className='movie-details-image' />

        <div className='movie-details-info'>
          <h1>{movie.title}</h1>

          <p className='movie-description'>
            Movie description will come here. Later this data will come from the database.
          </p>

          <button className='book-now-btn'>
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails