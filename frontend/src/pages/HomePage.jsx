import Navbar from '../components/Navbar.jsx'
import '../styles/HomePage.css'
import MovieCard from '../components/MovieCard.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`)
        setMovies(response.data)
      } catch (error) {
        console.log("Failed to fetch movies", error)
      }
    }

    fetchMovies()
  }, [])

  if(!movies){
    return (
      <div>
        <Navbar/>
        <div className='flex justify-center align-middle items-center mt-50'>
          <p className='text-3xl font-bold'>Loading...</p>
        </div>
      </div>
    )
  }
    return (
    <div>
        {/* Navbar Component */}
        <Navbar/>
        <div className='content-section p-2'>
            <p className='text-2xl font-bold mb-6'>Recommended Movies</p>
            {/* Movie Cards */}
            <div className='movie-cards flex gap-3'>
                {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}/>
             ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage
