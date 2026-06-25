import React from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/SeatSelection.css'
import Navbar from '../components/Navbar'

const SeatSelection = () => {
  
  // Extract id from URL
  let params = useParams();
  let id = params.id;

  // Dummy seat data
  const seats = [
        {
          id: "A1",
          row: "A",
          number: 1,
          status: "available"
        },
        {
          id: "A2",
          row: "A",
          number: 2,
          status: "booked"
        },
        {
          id: "A3",
          row: "A",
          number: 3,
          status: "available"
        },
        {
          id: "A4",
          row: "A",
          number: 4,
          status: "available"
        }
      ];

  function handleSeatSelect(seat){
    console.log(`seat clicked: ${seat.id}`);
  }
  
  // Return UI
  return (
    <div>
      
      {/* Insert Navbar Component */}
      <Navbar/>

      {/* Start Main Wrapper */}
      <div className='main-wrapper'>
        <Link to={`/movies/${id}`}>&larr; Back</Link>
        <p className='text-3xl mb-3'>Seat Booking</p>
        
        {/* Seats UI */}
        <div className='seat-ui flex flex-col justify-center align-bottom items-center gap-15'>
          <div className='screen flex flex-col items-center gap-1'>

          {/* Screen */}
          <div className="screen-line h-1 w-70 bg-red-400 rounded-3xl"></div>
            <p>All eyes this way!</p>
          </div>

          {/* Seats */}
          <div className="seats flex gap-3">
            {
              seats.map((seat) => 
              <button onClick={() => handleSeatSelect(seat)} 
              key={seat.id} 
              className='p-4 border cursor-pointer'>
                {seat.id}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection