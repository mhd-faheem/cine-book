import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import InfoIcon from "@mui/icons-material/InfoOutlined"
const MyBookings = () => { 
  const [bookings, setBookings] = useState([
    {
      id: 1,
      movieName: "Spider-Man: No Way Home",
      theatreName: "K Cinemas",
      screen: "Screen 1",
      date: "2026-06-28",
      time: "7:30 PM",
      seats: ["C2", "C3"],
      totalAmount: 470,
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    },
    {
      id: 2,
      movieName: "Inception",
      theatreName: "Showtime",
      screen: "Screen 2",
      date: "2026-06-30",
      time: "9:15 PM",
      seats: ["D4", "D5", "D6"],
      totalAmount: 720,
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    },
    {
      id: 3,
      movieName: "Aavesham",
      theatreName: "City Cineplex",
      screen: "Screen 1",
      date: "2026-07-02",
      time: "6:00 PM",
      seats: ["B1", "B2"],
      totalAmount: 330,
      paymentStatus: "paid",
      bookingStatus: "cancelled",
    },
  ])

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
                <div className='shadow-[0_6px_20px_rgba(0,0,0,0.20)] border border-gray-300  p-5 rounded-xl' key={booking.id}>
                    <h2>{booking.movieName}</h2>
                        <p>{booking.theatreName}</p>
                        <p>{booking.date} at {booking.time}</p>
                        <p>Seats: {booking.seats.join(", ")}</p>
                        <p>Status: <span className={booking.bookingStatus === "confirmed"? "text-green-500":"text-red-500"}>{booking.bookingStatus}</span></p>
                        <p>Total: ₹{booking.totalAmount}</p>  
                        <button className={
                          booking.bookingStatus === 'confirmed'?
                          "px-3 py-2 mt-2 bg-red-500 text-white cursor-pointer rounded-xl":"p-2 bg-red-200 rounded-xl mt-2 cursor-not-allowed text-white"}
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
