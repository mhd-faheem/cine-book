import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/SeatSelection.css'
import Navbar from '../components/Navbar'
import movies from '../data/movies.js'

const SeatSelection = () => {

  const [selectedSeats, setSelectedSeats] = useState([])
  let updatedSeats = [];
  // let tickets = 3;
  const [tickets, setTickets] = useState(3)
  let seatPrice = 150;
  // Dummy seat data
  const seats = [
    { id: "A1", row: "A", number: 1, status: "available" },
    { id: "A2", row: "A", number: 2, status: "booked" },
    { id: "A3", row: "A", number: 3, status: "available" },
    { id: "A4", row: "A", number: 4, status: "available" },
    { id: "A5", row: "A", number: 5, status: "booked" },
    { id: "A6", row: "A", number: 6, status: "available" },
    
    { id: "B1", row: "B", number: 1, status: "available" },
    { id: "B2", row: "B", number: 2, status: "available" },
    { id: "B3", row: "B", number: 3, status: "booked" },
    { id: "B4", row: "B", number: 4, status: "available" },
    { id: "B5", row: "B", number: 5, status: "available" },
    { id: "B6", row: "B", number: 6, status: "available" },
    
    { id: "C1", row: "C", number: 1, status: "booked" },
    { id: "C2", row: "C", number: 2, status: "available" },
    { id: "C3", row: "C", number: 3, status: "available" },
    { id: "C4", row: "C", number: 4, status: "available" },
    { id: "C5", row: "C", number: 5, status: "booked" },
    { id: "C6", row: "C", number: 6, status: "available" },
    
    { id: "D1", row: "D", number: 1, status: "available" },
    { id: "D2", row: "D", number: 2, status: "available" },
    { id: "D3", row: "D", number: 3, status: "available" },
    { id: "D4", row: "D", number: 4, status: "booked" },
    { id: "D5", row: "D", number: 5, status: "available" },
    { id: "D6", row: "D", number: 6, status: "available" },
  ]
  
  const rows = ["A", "B", "C", "D"]

  // Extract id from URL
  let params = useParams();
  let movieId = params.id;
  console.log(movieId)

  let movieData = movies.find(movie => movie.id === Number(movieId))

  if(!movieData) {
    return (
      <div>
        <Navbar/>
        <div className='flex justify-center items-center mt-20'>
          <p className='text-3xl font-bold'>Requested movie not found!</p>
        </div>
      </div>
    )
  }

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
        <div className="top-section p-5">
          <Link to={`/movies/${movieId}`} className='back-button'>&larr; Back</Link>
          <div className='flex justify-between mt-3 items-center'>
            <div className='flex flex-col gap-0.5 '>
              <p className='text-2xl font-regular'>{movieData.title}</p>
              <p className='text-gray-700'>Theatre name - Showtime</p>
            </div>
            <div className='ticket-counter'>
              <p className='font-regular text-red-500 underline cursor-pointer'>{tickets} Tickets</p>
              <button onClick={() => tickets<10?setTickets(tickets+1):null}>+</button>
              <button onClick={() => tickets>0?setTickets(tickets-1):null}>-</button>
            </div>
          </div>
        </div>
        
        {/* Seats UI */}
        <div className='seat-ui flex flex-col justify-center align-bottom items-center gap-15 mt-10'>
          <div className='screen flex flex-col items-center gap-1'>

          {/* Screen */}
          <div title="Theatre screen" className="screen-line w-70 bg-red-400 rounded-3xl"></div>
            <p className='mt-1.5'>All eyes this way!</p>
          </div>

          {/* Seats */}
          <div className="seats flex flex-col gap-3">
            {rows.map((row) => {
              const rowSeats = seats.filter(seat => seat.row === row)

              return (
                <div key={row} className='flex gap-3 items-center justify-center'>
                  <p>{row}</p>
                  {
              // Mapping each seat from seats array
              rowSeats.map((seat) => {
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
                  title={seat.status === "booked"? "Seat is already booked!":null}
                  key={seat.id}
                  className='p-3 font-medium shadow shadow-gray-300 cursor-pointer transition-colors ease-in-out duration-100 rounded'
                  style={{
                    backgroundColor: seatBgColor,
                    color: seatTextColor,
                    cursor: seatCursor,
                    fontSize: '15px',
                  }}
                >
                  {seat.id}
                </button>
              )
              })}
                </div>
              )
            })}   
            
          </div>
        </div>
          {selectedSeats.length>0 ? (
            <div className='flex flex-col justify-center items-center mt-10 gap-4'>
              <p className='text-sm'>Selected Seats: {selectedSeats.join(', ')}</p>
              <button className='p-3 bg-red-500 rounded text-white pay-button cursor-pointer'>Pay &#8377;{selectedSeats.length*seatPrice}</button>
            </div>
          ): <p className='text-sm flex flex-col justify-center items-center mt-10 gap-4'>Your perfect view is one tap away.</p>  }
        </div>
      </div>
  )
}

export default SeatSelection