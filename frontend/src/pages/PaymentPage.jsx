import Navbar from '../components/Navbar'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../utils/auth'
import { useState } from 'react'
import '../styles/SeatSelection.css'


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
          <div className='booking-dark-page'>
            <Navbar/>
            <div className='flex flex-col justify-center items-center mt-20 text-center px-5'>
            <p className='text-2xl font-semibold text-white'>No seats selected.</p>
            <p className='text-zinc-400 mt-2'>Please return to seat selection page to continue your booking.</p>
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

  return (
    <div className='booking-dark-page main-wrapper'>
      <Navbar/>
      <main className='mx-auto w-full max-w-3xl px-5 py-8'>
        <Link to={`/shows/${showId}/seats`} className='back-button'>&larr; Back</Link>

        <div className='mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-6'>
          <h1 className='text-3xl font-bold text-white'>Payment Summary</h1>
          <p className='mt-2 text-sm text-zinc-400'>Please check your booking details before payment.</p>

          <div className='mt-6 flex flex-col gap-2 text-zinc-300'>
            <p><b className='text-white'>Movie:</b> {movieName}</p>
            <p><b className='text-white'>Theatre:</b> {theatreName}</p>
            <p><b className='text-white'>Screen:</b> {screen || "Screen"}</p>
            <p><b className='text-white'>Date:</b> {showDate || "dd-mm-yyyy"}</p>
            <p><b className='text-white'>Showtime:</b> {showTime || "Showtime"}</p>
            <p><b className='text-white'>Seats selected:</b> {selectedSeats.join(", ")}</p>
          </div>

          <div className='my-5 h-px bg-zinc-800'></div>

          <div className='flex flex-col gap-2 text-zinc-300'>
            <p><b className='text-white'>Booking Fee:</b> &#8377;{totalPrice}</p>
            <p><b className='text-white'>Convenience Fee:</b> &#8377;{convFee}</p>
            <p className='text-lg'><b className='text-white'>Total Fee:</b> <span className='font-bold text-red-400'>&#8377;{finalPrice}</span></p>
          </div>

          {error && (
            <p className='mt-4 text-center text-sm text-red-400'>{error}</p>
          )}

          <div className='mt-6 flex justify-center'>
            <button
              className='pay-button rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60'
              onClick={handleConfirmPayment}
              disabled={submitting}
            >
              {submitting ? "Confirming..." : "Confirm payment"}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PaymentPage
