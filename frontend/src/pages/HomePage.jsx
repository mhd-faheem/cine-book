import Navbar from '../components/Navbar.jsx'
import '../styles/HomePage.css'
import MovieCard from '../components/MovieCard.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`)
        setMovies(response.data)
      } catch (error) {
        console.log("Failed to fetch movies", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if(loading){
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
    <div className='home-page'>
        {/* Navbar Component */}
        <Navbar/>
        <div className='content-section'>
            <div className='home-header'>
              <p className='home-title'>Recommended Movies</p>
              <p className='home-subtitle'>Book your next big-screen watch from the movies currently showing.</p>
            </div>
            {/* Movie Cards */}
            <div className='movie-cards'>
                {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}/>
             ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage
