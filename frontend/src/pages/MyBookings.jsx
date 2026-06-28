import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import InfoIcon from "@mui/icons-material/InfoOutlined"
import { useState } from 'react'

const MyBookings = () => { 
  const [bookings, setBookings] = useState(() => {
    const savedBookings = sessionStorage.getItem("bookings")
    return savedBookings ? JSON.parse(savedBookings) : []
  })

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

  function handleCancelBooking(bookingId) {
    const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      )

      if (!confirmCancel) {
        return
      }

    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          bookingStatus: "cancelled",
        }
      }

      return booking
  })

  setBookings(updatedBookings)
  sessionStorage.setItem("bookings", JSON.stringify(updatedBookings))
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
                <div className='shadow-[0_6px_20px_rgba(0,0,0,0.20)] border border-gray-300  p-5 rounded-xl min-w-80' key={booking.id}>
                        <h2>Movie: {booking.movieName}</h2>
                        <p>Theatre: {booking.theatreName}</p>
                        <p>Date: dd-mm-yyyy at 00:00 am</p>
                        <p>Seats: {booking.seats.join(", ")}</p>
                        <p>Status: <span className={booking.bookingStatus === "confirmed"? "text-green-500":"text-red-500"}>{booking.bookingStatus}</span></p>
                        <p>Amount Paid: ₹{booking.totalAmount}</p>  
                        <button className={
                          booking.bookingStatus === 'confirmed'?
                          "px-3 py-2 mt-3 bg-red-500 text-white cursor-pointer rounded-xl":"p-2 bg-red-200 rounded-xl mt-2 cursor-not-allowed text-white"}
                          onClick={() => handleCancelBooking(booking.id)}
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
