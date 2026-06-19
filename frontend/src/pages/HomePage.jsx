import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import image from '../assets/dummy-image.jpg'
import '../styles/HomePage.css'

const HomePage = () => {
  return (
    <div>
        {/* Navbar Component */}
        <Navbar/>
        <div className='content-section'>
            <p className='text-2xl font-bold mb-5'>Welcome, User</p>
            {/* Movie Cards */}
            <div className='movie-cards flex gap-3'>
                    <div className='flex flex-col gap-3'>
                        <img src={image} alt="dummy image"/>  
                        <p className='text-'>Interstellar</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <img src={image} alt="dummy image"/>  
                        <p className='text-'>Aavesham</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <img src={image} alt="dummy image"/>  
                        <p className='text-'>Spider-Man: No Way Home</p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage
