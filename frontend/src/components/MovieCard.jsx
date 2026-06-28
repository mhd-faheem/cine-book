import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} className='movie-card'>
      <img src={movie.poster} alt={movie.title} />
      <div className='movie-card-info'>
        <p className='movie-card-title'>{movie.title}</p>
        <p className='movie-card-meta'>{movie.language} • {movie.certification}</p>
      </div>
    </Link>
  )
}

export default MovieCard
