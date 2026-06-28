import Navbar from '../components/Navbar'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../utils/auth'
import { useState } from 'react'


const PaymentPage = () => {
  const location = useLocation()
  const bookingData = location.state
  const navigate = useNavigate()
  const params = useParams()
  const showIdFromParams = params.showId
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Return error ui if booking data is not found
  if(!bookingData){
      return (
          <div>
            <Navbar/>
            <div className='flex flex-col justify-center items-center mt-10'>
            <p className='text-2xl font-medium'>No seats selected. Please return to Seat selection page.</p>
            <Link to={`/shows/${showIdFromParams}/seats`} className='back-button ml-5 mt-2.5'>&larr; Back</Link>
            </div>
          </div>

      )
    }

  const movieName = bookingData.movieName
  const theatreName = bookingData.theatreName
  const showDate = bookingData.showDate
  const showTime = bookingData.showTime
  const screen = bookingData.screen
  const selectedSeats = bookingData.selectedSeats
  const totalPrice = bookingData.totalPrice
  const showId = bookingData.showId || showIdFromParams
const convFee = Number((totalPrice * 2.7 / 100).toFixed(2))
  const finalPrice = totalPrice + convFee

  async function handleConfirmPayment() {
    setSubmitting(true)
    setError("")

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          show: showId,
          movieName,
          theatreName,
          screen,
          date: showDate,
          time: showTime,
          seats: selectedSeats,
          seatAmount: totalPrice,
          convenienceFee: convFee,
          totalAmount: finalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

    sessionStorage.removeItem("selectedSeats")
    sessionStorage.removeItem("selectedTicketCount")

    navigate("/bookings")
    } catch (error) {
      console.log("Failed to confirm booking", error.response?.data || error)
      setError(error.response?.data?.message || "Failed to confirm booking")
    } finally {
      setSubmitting(false)
    }

  }

  console.log(bookingData)
  return (
    <div className='main-wrapper'>
      {/* Navbar Component */}
      <Navbar/>
        <Link to={`/shows/${showId}/seats`} className='back-button ml-5 mt-2.5'>&larr; Back</Link>
      <div className='flex justify-center'>
        <div className="booking-details flex flex-col p-8 bg-gray-100 w-1/2 rounded border-dashed border-2 border-gray-600 mt-10">
          <div className='flex justify-center'>
            <p className='text-3xl mb-10 font-bold underline'>Payment Summary</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p><b>Movie:</b> {movieName}</p>
            <p><b>Theatre:</b> {theatreName}</p>
            <p><b>Screen:</b> {screen || "Screen"}</p>
            <p><b>Date:</b> {showDate || "dd-mm-yyyy"}</p>
            <p><b>Showtime:</b> {showTime || "Showtime"}</p>
            <p><b>Seats selected:</b> {selectedSeats.join(", ")}</p>
            <div className='w-full bg-gray-400 mt-2 mb-2' style={{height: "1px"}}></div>
            <p><b>Booking Fee:</b> &#8377;{totalPrice}</p>
            <p><b>Convenience Fee: </b>&#8377;{convFee}</p>
            <p><b>Total Fee: </b>&#8377;{finalPrice}</p>
            {error && (
              <p className='text-red-500 text-center mt-3'>{error}</p>
            )}
            <div className='flex justify-center'>
              <button className='p-3 bg-red-500 text-white rounded-xl mt-6 cursor-pointer'
               onClick={handleConfirmPayment}
               disabled={submitting}
              >
                {submitting ? "Confirming..." : "Confirm payment"}
              </button>
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default PaymentPage
