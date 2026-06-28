import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../styles/SeatSelection.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext.jsx'
import axios from 'axios'

const SeatSelection = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const movieId = params.id;
  const selectedShow = location.state?.show;
  const selectedTicketCount = location.state?.tickets;
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/${movieId}`);
        setMovieData(response.data);
      } catch (error) {
        console.log("Failed to fetch movie", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Load selected seats from temporary storage
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const savedSeats = sessionStorage.getItem("selectedSeats")
    return savedSeats ? JSON.parse(savedSeats) : []
  })

  // Store selected seats to temporary storage
  useEffect(() => {
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))
  }, [selectedSeats])


  const [tickets, setTickets] = useState(selectedTicketCount || 1)
  const [autoSelectEnabled, setAutoSelectEnabled] = useState(false)
  let updatedSeats = [];

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
  { id: "F4", row: "F", number: 4, status: "booked", type: "seat", category: "sofa" },
  { id: "F5", row: "F", number: 5, status: "booked", type: "seat", category: "sofa" },
  { id: "F6", row: "F", number: 6, status: "booked", type: "seat", category: "sofa" },

  { id: "G1", row: "G", number: 1, status: "available", type: "seat", category: "sofa" },
  { id: "G2", row: "G", number: 2, status: "booked", type: "seat", category: "sofa" },
  { id: "G3", row: "G", number: 3, status: "available", type: "seat", category: "sofa" },
  { id: "G4", row: "G", number: 4, status: "available", type: "seat", category: "sofa" },
]

const seatPrices = [
  
  { category:'standard', price:150},
  { category:'premium', price:220},
  { category:'sofa', price:300},
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

const activeScreen = selectedShow?.theatre?.screens?.find((screen) => {
  return screen.name === selectedShow.screen
})

const backendSeats = activeScreen?.seats?.map((seat) => {
  return {
    id: seat.seatId,
    row: seat.row,
    number: seat.number,
    status: selectedShow?.bookedSeats?.includes(seat.seatId)
      ? "booked"
      : "available",
    type: seat.itemType,
    category: seat.category,
  }
}) || []

const backendLayout = activeScreen?.layout?.map((item, index) => {
  return {
    id: `${item.itemType}-${item.row || item.label || index}`,
    type: item.itemType,
    label: item.label,
    row: item.row,
    price: item.category ? activeScreen.prices[item.category] : undefined,
  }
}) || []

const backendSeatPrices = activeScreen
  ? [
      { category: "standard", price: activeScreen.prices.standard },
      { category: "premium", price: activeScreen.prices.premium },
      { category: "sofa", price: activeScreen.prices.sofa },
    ]
  : []

const displaySeats = backendSeats.length > 0 ? backendSeats : seats
const displayTheatreLayout = backendLayout.length > 0 ? backendLayout : theatreLayout
const displaySeatPrices = backendSeatPrices.length > 0 ? backendSeatPrices : seatPrices

const totalAmount = selectedSeats.reduce((sum, seatId) => {
  const seat = displaySeats.find((seat) => seat.id === seatId)
  const priceItem = displaySeatPrices.find((item) => item.category === seat?.category)

  return sum + (priceItem?.price || 0)
}, 0)

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
  
  function getSequentialSeats(startSeat) {
    const rowSeats = displaySeats.filter((seat) => {
      return seat.row === startSeat.row
    })

    const startIndex = rowSeats.findIndex((seat) => {
      return seat.id === startSeat.id
    })

    const seatsToSelect = []

    for (let i = startIndex; i < rowSeats.length; i++) {
      const currentSeat = rowSeats[i]

      if (currentSeat.type !== "seat" || currentSeat.status === "booked") {
        break
      }

      seatsToSelect.push(currentSeat.id)

      if (seatsToSelect.length === tickets) {
        break
      }
    }

    return seatsToSelect
  }

  function handleSeatSelect(seat){
    console.log(`seat clicked: ${seat.id}`);

    if (seat.type !== "seat" || seat.status === "booked") {
      return
    }
    
    // Unselect Seat if already selected
    if(selectedSeats.includes(seat.id)){
      updatedSeats = selectedSeats.filter((selectedSeat) => {
        return selectedSeat !== seat.id
      })
      
      setSelectedSeats(updatedSeats)
      // Add selected seats to list
    } else if (autoSelectEnabled) {
      const autoSelectedSeats = getSequentialSeats(seat)
      const seatsNeeded = tickets - selectedSeats.length
      const newSeats = autoSelectedSeats.filter((seatId) => {
        return !selectedSeats.includes(seatId)
      })
      const seatsToAdd = newSeats.slice(0, seatsNeeded)

      setSelectedSeats([...selectedSeats, ...seatsToAdd])
    } else if (!selectedSeats.includes(seat.id) &&  selectedSeats.length<=tickets-1) {
      updatedSeats =  [...selectedSeats, seat.id]
      setSelectedSeats(updatedSeats)
    } else {
      setSelectedSeats([seat.id])
    }
    
    console.log(selectedSeats)  
    
  }
  
    function calculateTotal() {
      return (
        <div>
          <p>&#8377;{totalAmount}</p>
        </div>
      )
    }  
  // Handle Payment
  function handlePayment() {

    // Forces guest accounts to login/signup before seat booking
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", `/movies/${movieId}/shows`)
      navigate("/login")
      return
    }    

    if(tickets===selectedSeats.length){
      navigate(`/movies/${movieId}/seats/payment`, {
        state: {
          movieName: movieData.title,
          theatreName: selectedShow?.theatre?.name || "K Cinemas",
          showDate: selectedShow?.date,
          showTime: selectedShow?.time,
          showId: selectedShow?._id,
          screen: selectedShow?.screen,
          selectedSeats: selectedSeats,
          totalPrice: totalAmount,
        }
      })
    } else {
      return
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
          <Link to={`/movies/${movieId}/shows`} className='back-button' onClick={() => sessionStorage.removeItem("selectedSeats")}>&larr; Back</Link>
          <div className='flex justify-between mt-3 items-center'>
            <div className='flex flex-col gap-0.5 '>
              <p className='text-2xl font-regular'>{movieData.title}</p>
              <p className='text-gray-700'>
                {selectedShow?.theatre?.name || "Theatre"} - {selectedShow?.screen || "Screen"}
              </p>
              {selectedShow && (
                <p className='text-gray-500'>{selectedShow.date} at {selectedShow.time}</p>
              )}
            </div>
            <div className='ticket-counter'>
              <p className='font-regular text-red-500 underline cursor-pointer'>{tickets} Tickets</p>
              <button onClick={() => tickets<10?setTickets(tickets+1):null}>+</button>
              <button onClick={() => tickets>0?setTickets(tickets-1):null}>-</button>
            </div>
          </div>
          <div className='flex justify-end mt-4'>
            <label className='flex items-center gap-2 text-sm cursor-pointer'>
              <input
                type="checkbox"
                checked={autoSelectEnabled}
                onChange={(e) => setAutoSelectEnabled(e.target.checked)}
              />
              Auto-select nearby seats
            </label>
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
            {displayTheatreLayout.map((item) => {
              const rowSeats = displaySeats.filter(seat => seat.row === item.row)

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
                    seatCursor = 'default'
                  }

                  if (seat.category === "sofa") {
                    seatWidth = 50;
                    seatHeight = 35;
                  }

                  return (
                    // Seat button mapping
                    <button
                      onClick={() => handleSeatSelect(seat)}
                      disabled={seat.status === "booked" || seat.type !== "seat"}
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
