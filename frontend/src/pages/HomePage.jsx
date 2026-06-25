import React from 'react'
import Navbar from '../components/Navbar.jsx'
import '../styles/HomePage.css'
import MovieCard from '../components/MovieCard.jsx'
import movies from '../data/movies.js'

const HomePage = () => {
  return (
    <div>
        {/* Navbar Component */}
        <Navbar/>
        <div className='content-section p-2'>
            <p className='text-2xl font-bold mb-6'>Recommended Movies</p>
            {/* Movie Cards */}
            <div className='movie-cards flex gap-3'>
                {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
             ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage
