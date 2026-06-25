import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
        <div className='flex flex-row justify-between p-5 border border-gray-700 align-middle items-center text-white bg-black'>
            <Link to={'/'}>
                <p className='text-3xl font-extrabold text-red-500'>CineBook</p>
            </Link>
            <ul className='flex gap-4'>
                {/* Navigations */}
                <Link to="/login">
                    <li>Login</li>
                </Link>
                <Link to="/signup">
                    <li>Sign Up</li>
                </Link>
                <Link to="/bookings">
                    <li>My Bookings</li>
                </Link>

                {/* Routes are not defined. Waiting for other pages to be compeleted */}
            </ul>
        </div>
    
  )
}

export default Navbar
