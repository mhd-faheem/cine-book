import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/SeatSelection.css'
import Navbar from '../components/Navbar'
import movies from '../data/movies.js'
import { useAuth } from '../context/AuthContext.jsx'

const SeatSelection = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load selected seats from temporary storage
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const savedSeats = sessionStorage.getItem("selectedSeats")
    return savedSeats ? JSON.parse(savedSeats) : []
  })

  // Store selected seats to temporary storage
  useEffect(() => {
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))
  }, [selectedSeats])


  const [tickets, setTickets] = useState(3)
  let updatedSeats = [];
  let seatPrice = 150;
  let totalPrice = 0;

  // Dummy seat data
//   const seats = [
//     { id: "A1", row: "A", number: 1, status: "available", type: "seat", category: "standard"},
//     { id: "A2", row: "A", number: 2, status: "booked",  type: "seat"},
//     {row:"A", type: "empty" },
//     { id: "A3", row: "A", number: 3, status: "available",  type: "seat", category: "standard" },
//     { id: "A4", row: "A", number: 4, status: "available",  type: "seat", category: "standard" },
//     { id: "A5", row: "A", number: 5, status: "booked",  type: "seat", category: "standard" },
//     {row:"A", type: "empty" },
//     { id: "A6", row: "A", number: 6, status: "available",  type: "seat", category: "standard" },
//     { id: "A7", row: "A", number: 7, status: "available",  type: "seat", category: "standard" },
    
//     { id: "B1", row: "B", number: 1, status: "available",  type: "seat", category: "standard" },
//     { id: "B2", row: "B", number: 2, status: "available",  type: "seat", category: "standard" },
//     { id: "B3", row: "B", number: 3, status: "booked", type: "seat", category: "standard" },
//     { id: "B4", row: "B", number: 4, status: "available", type: "seat", category: "standard" },
//     { id: "B5", row: "B", number: 5, status: "available", type: "seat", category: "standard" },
//     { id: "B6", row: "B", number: 6, status: "available", type: "seat", category: "standard" },
//     {row:"B", type: "empty" },
//     { id: "B7", row: "B", number: 7, status: "available", type: "seat", category: "standard" },
    
//     { id: "C1", row: "C", number: 1, status: "booked", type: "seat", category: "premium"},
//     { id: "C2", row: "C", number: 2, status: "available", type: "seat", category: "premium"},
//     { id: "C3", row: "C", number: 3, status: "available", type: "seat", category: "premium"},
//     { id: "C4", row: "C", number: 4, status: "available", type: "seat", category: "premium" },
//     { id: "C5", row: "C", number: 5, status: "booked", type: "seat", category: "premium" },
//     {row:"C", type: "empty" },
//     { id: "C6", row: "C", number: 6, status: "available", type: "seat", category: "premium" },
    
//     { id: "D1", row: "D", number: 1, status: "available", type: "seat", category: "sofa" },
//     { id: "D2", row: "D", number: 2, status: "available", type: "seat", category: "sofa" },
//     { id: "D3", row: "D", number: 3, status: "available", type: "seat", category: "sofa" },
//     { id: "D4", row: "D", number: 4, status: "booked", type: "seat", category: "sofa" },
    
//     { id: "D5", row: "D", number: 5, status: "available", type: "seat" },
//     {row:"D", type: "empty" },
//     { id: "D6", row: "D", number: 6, status: "available", type: "seat" },
//   ]
  
//   // "blank" -> means passage or blank row
//   const theatreLayout = [
//     { id: 1, type: "separator", label: "Standard", price: 150 },
//     { id: 2, type: "row", row: "A" },
//     { id: 3, type: "row", row: "B" },
//     { id: 4, type: "separator", label: "Premium", price: 220 },
//     { id: 5, type: "row", row: "C" },
//     { id: 6, type: "blank"},
//     { id: 7, type: "separator", label: "Sofa", price: 300 },
//     { id: 8, type: "row", row: "D" },
// ]

const seats = [
  { id: "A1", row: "A", number: 1, status: "available", type: "seat", category: "standard" },
  { id: "A2", row: "A", number: 2, status: "booked", type: "seat", category: "standard" },
  { id: "A3", row: "A", number: 3, status: "available", type: "seat", category: "standard" },
  { id: "A4", row: "A", number: 4, status: "available", type: "seat", category: "standard" },
  { id: "A5", row: "A", number: 5, status: "booked", type: "seat", category: "standard" },
  { id: "A6", row: "A", number: 6, status: "available", type: "seat", category: "standard" },
  { id: "A7", row: "A", number: 7, status: "available", type: "seat", category: "standard" },

  { id: "B1", row: "B", number: 1, status: "available", type: "seat", category: "standard" },
  { id: "B2", row: "B", number: 2, status: "available", type: "seat", category: "standard" },
  { id: "B3", row: "B", number: 3, status: "booked", type: "seat", category: "standard" },
  { id: "B4", row: "B", number: 4, status: "available", type: "seat", category: "standard" },
  { id: "B5", row: "B", number: 5, status: "available", type: "seat", category: "standard" },
  { id: "B6", row: "B", number: 6, status: "available", type: "seat", category: "standard" },
  { id: "B7", row: "B", number: 7, status: "available", type: "seat", category: "standard" },
  { id: "B8", row: "B", number: 8, status: "booked", type: "seat", category: "standard" },

  { id: "C1", row: "C", number: 1, status: "booked", type: "seat", category: "premium" },
  { id: "C2", row: "C", number: 2, status: "available", type: "seat", category: "premium" },
  { id: "C3", row: "C", number: 3, status: "available", type: "seat", category: "premium" },
  { id: "C4", row: "C", number: 4, status: "available", type: "seat", category: "premium" },
  { id: "C5", row: "C", number: 5, status: "booked", type: "seat", category: "premium" },
  { id: "C6", row: "C", number: 6, status: "available", type: "seat", category: "premium" },
  { id: "C7", row: "C", number: 7, status: "available", type: "seat", category: "premium" },
  { id: "C8", row: "C", number: 8, status: "available", type: "seat", category: "premium" },

  { id: "D1", row: "D", number: 1, status: "available", type: "seat", category: "premium" },
  { id: "D2", row: "D", number: 2, status: "available", type: "seat", category: "premium" },
  { id: "D3", row: "D", number: 3, status: "booked", type: "seat", category: "premium" },
  { id: "D4", row: "D", number: 4, status: "available", type: "seat", category: "premium" },
  { id: "D5", row: "D", number: 5, status: "available", type: "seat", category: "premium" },
  { id: "D6", row: "D", number: 6, status: "available", type: "seat", category: "premium" },
  { id: "D7", row: "D", number: 7, status: "available", type: "seat", category: "premium" },
  { id: "D8", row: "D", number: 8, status: "available", type: "seat", category: "premium" },

  { id: "E1", row: "E", number: 1, status: "available", type: "seat", category: "premium" },
  { id: "E2", row: "E", number: 2, status: "booked", type: "seat", category: "premium" },
  { id: "E3", row: "E", number: 3, status: "available", type: "seat", category: "premium" },
  { id: "E4", row: "E", number: 4, status: "available", type: "seat", category: "premium" },
  { id: "E5", row: "E", number: 5, status: "available", type: "seat", category: "premium" },
  { id: "E6", row: "E", number: 6, status: "booked", type: "seat", category: "premium" },
  { id: "E7", row: "E", number: 7, status: "available", type: "seat", category: "premium" },

  { id: "F1", row: "F", number: 1, status: "available", type: "seat", category: "sofa" },
  { id: "F2", row: "F", number: 2, status: "available", type: "seat", category: "sofa" },
  { id: "F3", row: "F", number: 3, status: "booked", type: "seat", category: "sofa" },
  { id: "F4", row: "F", number: 4, status: "available", type: "seat", category: "sofa" },
  { id: "F5", row: "F", number: 5, status: "available", type: "seat", category: "sofa" },
  { id: "F6", row: "F", number: 6, status: "available", type: "seat", category: "sofa" },

  { id: "G1", row: "G", number: 1, status: "available", type: "seat", category: "sofa" },
  { id: "G2", row: "G", number: 2, status: "booked", type: "seat", category: "sofa" },
  { id: "G3", row: "G", number: 3, status: "available", type: "seat", category: "sofa" },
  { id: "G4", row: "G", number: 4, status: "available", type: "seat", category: "sofa" },
]

const theatreLayout = [
  { id: 1, type: "separator", label: "Standard", price: 150 },
  { id: 2, type: "row", row: "A" },
  { id: 3, type: "row", row: "B" },
  { id: 4, type: "blank" },


  { id: 5, type: "separator", label: "Premium", price: 220 },
  { id: 6, type: "row", row: "C" },
  { id: 7, type: "blank" },

  { id: 8, type: "row", row: "D" },

  { id: 9, type: "row", row: "E" },

  { id: 10, type: "separator", label: "Sofa", price: 300 },
  { id: 11, type: "row", row: "F" },
  { id: 12, type: "row", row: "G" },
]
  // Extract id from URL
  let params = useParams();
  let movieId = params.id;

  // Find movie data from movies array using id
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
    
    // Unselect Seat if already selected
    if(selectedSeats.includes(seat.id)){
      updatedSeats = selectedSeats.filter((selectedSeat) => {
        return selectedSeat !== seat.id
      })
      
      setSelectedSeats(updatedSeats)
      // Add selected seats to list
    } else if (!selectedSeats.includes(seat.id) &&  selectedSeats.length<=tickets-1) {
      updatedSeats =  [...selectedSeats, seat.id]
      setSelectedSeats(updatedSeats)
    } else {
      setSelectedSeats([seat.id])
    }
    
    console.log(selectedSeats)  
    
  }
  
  function calculateTotal(){
    totalPrice = selectedSeats.length*seatPrice
    return (
        <p>&#8377;{totalPrice}</p>
      )
  }
  
  // Handle Payment
  function handlePayment() {
    if(tickets===selectedSeats.length){
      navigate(`/movies/${movieId}/seats/payment`, {
        state: {
          movieName: movieData.title,
          theatreName: "K Cinemas",
          selectedSeats: selectedSeats,
          totalPrice: totalPrice,
        }
      })
    } else {
      alert(`Please select exactly ${tickets} Tickets`)
    }
  }
  
  // Return UI
  return (
    <div>
      
      {/* Navbar Component */}
      <Navbar/>

      {/* Start Main Wrapper */}
      <div className='main-wrapper items-center'>
        <div className="top-section p-5 w-full">
          <Link to={`/movies/${movieId}`} className='back-button' onClick={() => sessionStorage.removeItem("selectedSeats")}>&larr; Back</Link>
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
        <div className='seat-ui flex flex-col justify-center align-middle items-center mt-10 mb-12 w-3/4'>
          <div className='screen flex flex-col items-center gap-1 align-middle'>

          {/* Screen */}
          <div title="Theatre screen" className="screen-line w-70 bg-red-400 rounded-3xl"></div>
            <p className='mt-1.5 mb-9'>All eyes this way!</p>
          </div>

            <div className='flex flex-col justify-center items-center mb-5'>
              {selectedSeats.length>0?(
              <p className='text-sm'>Selected Seats: {selectedSeats.join(', ')}</p>):<p className='text-sm'>Your perfect view is one tap away!</p>}
            </div>

          {/* Seats */}
          <div className="seats flex flex-col gap-3">
            {theatreLayout.map((item) => {
              const rowSeats = seats.filter(seat => seat.row === item.row)

              // Blank row UI
              if(item.type === "blank")
                return (
                  <div key={item.id} className='h-6'></div>
                )

              // Separator UI
              if(item.type === 'separator')
                return (
                  <div key={item.id} className='mt-3'>
                    <p>{item.label} - &#8377;{item.price}</p>
                    <div className='w-full seat-separator bg-gray-400'></div>
                  </div>
                )

              // Seat row ui
              if(item.type === "row"){
              return (
                <div key={item.id} className='flex gap-3 items-center justify-center w-full'>
                  <p className='row-label mr-10 font-light text-gray-600'>{item.row}</p>
                  {
                  // Mapping each seat from seats array
                  rowSeats.map((seat) => {
                  // Seat Styling variables
                  let seatBgColor = 'white'
                  let seatTextColor = 'black'
                  let seatCursor = 'pointer'
                  let seatOpacity = 100
                  let seatWidth = 40
                  let seatHeight = 40

                  // Selected Seat style
                  if (selectedSeats.includes(seat.id)) {
                    seatBgColor = 'green'
                    seatTextColor = 'white'
                  }

                  // Booked seat style
                  if (seat.status === "booked") {
                    seatBgColor = 'grey'
                    seatCursor = 'not-allowed'
                  }

                  // Empty seat style
                  if (seat.type === "empty") {
                    seatOpacity = 0;
                  }

                  if (seat.category === "sofa") {
                    seatWidth = 50;
                    seatHeight = 35;
                  }

                  return (
                    // Seat button mapping
                    <button
                      onClick={() => handleSeatSelect(seat)}
                      disabled={seat.status === "booked" || seat.type === "aisle"}
                      title={seat.status === "booked"? "Seat is already booked!":null}
                      key={seat.id}
                      className='font-medium shadow shadow-gray-300 cursor-pointer transition-colors ease-in-out duration-100 rounded'
                      style={{
                        backgroundColor: seatBgColor,
                        color: seatTextColor,
                        cursor: seatCursor,
                        opacity: seatOpacity,
                        fontSize: '15px',
                        width: seatWidth,
                        height: seatHeight
                      }}
                    >
                      {seat.id}
                    </button>
                  )
                  })}
                    </div>
                  )}
                })}   
                
          </div>
         </div>
        </div>
        {/* Pay button UI */}
        {selectedSeats.length>0 ?<button className='flex items-center align-middle justify-center gap-2 p-3 w-1/3 bg-red-500 rounded text-white pay-button cursor-pointer left-1/2 -translate-x-1/2 sticky bottom-5' onClick={handlePayment}>Pay{calculateTotal()}</button>: null}
      </div>
  )
}

export default SeatSelection