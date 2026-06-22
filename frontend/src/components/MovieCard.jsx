import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className='flex flex-col gap-3'>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.title}</p>
    </Link>
  )
}

export default MovieCard