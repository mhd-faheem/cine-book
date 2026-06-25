import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/SeatSelection.css'
import Navbar from '../components/Navbar'

const SeatSelection = () => {

  const [selectedSeats, setSelectedSeats] = useState([])
  let updatedSeats = [];
  let tickets = 3;
  let seatPrice = 150;
  
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
        },
        {
          id: "A5",
          row: "A",
          number: 5,
          status: "available"
        }
      ];

  function handleSeatSelect(seat){
    console.log(`seat clicked: ${seat.id}`);
    console.log(selectedSeats.includes(seat.id))

    // Unselect Seat if already selected
    if(selectedSeats.includes(seat.id)){
      let updatedSeats = selectedSeats.filter((selectedSeat) => {
      return selectedSeat !== seat.id
    })

    setSelectedSeats(updatedSeats)
    // Add selected seats to list
    } else if (!selectedSeats.includes(seat.id) &&  selectedSeats.length<=tickets-1) {
      let updatedSeats =  [...selectedSeats, seat.id]
      setSelectedSeats(updatedSeats)
    } else {
      setSelectedSeats([])
    }

    console.log(selectedSeats)  

  
  }
  
  // Return UI
  return (
    <div>
      
      {/* Insert Navbar Component */}
      <Navbar/>

      {/* Start Main Wrapper */}
      <div className='main-wrapper'>
        <Link to={`/movies/${id}`} className='back-button'>&larr; Back</Link>
        <div className='flex justify-between'>
          <p className='text-3xl mb-3'>Movie Name: Showtime</p>
          <p>Tickets: {tickets}</p>
        </div>
        
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
              // Mapping each seat from seats array
              seats.map((seat) => {
              // Seat Styling variables
              let seatBgColor = 'white'
              let seatTextColor = 'black'
              let seatCursor = 'pointer'

              if (selectedSeats.includes(seat.id)) {
                seatBgColor = 'green'
                seatTextColor = 'white'
              }

              if (seat.status === "booked") {
                seatBgColor = 'grey'
                seatCursor = 'not-allowed'
              }

              return (
                <button
                  onClick={() => handleSeatSelect(seat)}
                  disabled={seat.status === "booked"}
                  key={seat.id}
                  className='p-4 border cursor-pointer'
                  style={{
                    backgroundColor: seatBgColor,
                    color: seatTextColor,
                    cursor: seatCursor,
                    fontSize: '20px',
                  }}
                >
                  {seat.id}
                </button>
              )
              })}
          </div>
        </div>
          {selectedSeats.length>0 && (
            <div className='flex flex-col justify-center items-center mt-10'>
              <p className='text-xl'>Selected Seats: {selectedSeats.join(', ')}</p>
              <button>Pay &#8377;{selectedSeats.length*seatPrice}</button>
            </div>
          )}
        </div>
      </div>
  )
}

export default SeatSelection