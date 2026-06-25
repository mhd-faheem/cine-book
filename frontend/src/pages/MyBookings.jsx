import React from 'react'
import Navbar from '../components/Navbar'

const MyBookings = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center align-middle m-10'>
          <p className='text-3xl font-extrabold'>My Bookings Page</p>
      </div>
    </div>
  )
}

export default MyBookings
