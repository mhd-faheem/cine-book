import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import InfoIcon from "@mui/icons-material/InfoOutlined"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../utils/auth'

const MyBookings = () => { 
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/my`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

        setBookings(response.data)
      } catch (error) {
        console.log("Failed to fetch bookings", error.response?.data || error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div>
        <Navbar/>
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-2xl font-bold text-gray-800">Loading bookings...</p>
        </div>
      </div>
    )
  }

  if(bookings.length === 0){
    return (
      <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center mt-20 text-center">
                  <Link to={`/`} className='back-button' onClick={() => sessionStorage.removeItem("selectedSeats")}>&larr; Back to home</Link>
        
    <h2 className="text-2xl font-bold text-gray-800">
      No bookings yet
    </h2>
    <p className="text-gray-500 mt-2">
      Your booked movie tickets will appear here once you complete a payment.
    </p>
  </div>
      </div>
      
    )
  }

  async function handleCancelBooking(bookingId) {
    const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      )

      if (!confirmCancel) {
        return
      }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      const updatedBookings = bookings.map((booking) => {
        if (booking._id === bookingId) {
          return response.data.booking
        }

        return booking
      })

      setBookings(updatedBookings)
    } catch (error) {
      console.log("Failed to cancel booking", error.response?.data || error)
    }
  }

  return (
    <div>
      <Navbar/>
      <div className='flex justify-center align-middle items-left m-8 flex-col gap-6'>
                  <Link to={`/`} className='back-button'>&larr; Back to Home</Link>

          <p className='text-3xl font-extrabold'>Your Bookings</p>
          <div className='flex items-center align-middle gap-2'>
            <InfoIcon fontSize="small" className='text-gray-400' />
            <p className='text-gray-500'>Cancellations only allowed upto 2 hours before before showtime begins.</p>
          </div>
          <div className='flex gap-5'>
            {bookings.map((booking) => {
              return (
                <div className='shadow-[0_6px_20px_rgba(0,0,0,0.20)] border border-gray-300  p-5 rounded-xl min-w-80' key={booking._id}>
                        <h2>Movie: {booking.movieName}</h2>
                        <p>Theatre: {booking.theatreName}</p>
                        <p>Screen: {booking.screen || "Screen"}</p>
                        <p>Date: {booking.date || "dd-mm-yyyy"} at {booking.time || "00:00 am"}</p>
                        <p>Seats: {booking.seats.join(", ")}</p>
                        <p>Status: <span className={booking.bookingStatus === "confirmed"? "text-green-500":"text-red-500"}>{booking.bookingStatus}</span></p>
                        <p>Amount Paid: ₹{booking.totalAmount}</p>  
                        <button className={
                          booking.bookingStatus === 'confirmed'?
                          "px-3 py-2 mt-3 bg-red-500 text-white cursor-pointer rounded-xl":"p-2 bg-red-200 rounded-xl mt-2 cursor-not-allowed text-white"}
                          disabled={booking.bookingStatus !== "confirmed"}
                          onClick={() => handleCancelBooking(booking._id)}
                        >Cancel Booking</button>              
                  </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}

export default MyBookings
