import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import InfoIcon from "@mui/icons-material/InfoOutlined"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../utils/auth'
import toast from "react-hot-toast";
import ConfirmationModal from "../components/admin/ConfirmationModal";

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

      try {
        setError("")
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/my`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

        setBookings(response.data)
      } catch (error) {
        console.log("Failed to fetch bookings", error.response?.data || error)
        setError("Unable to load your bookings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div className='booking-dark-page'>
        <Navbar/>
        <div className="cinema-loader">
          <div className="cinema-loader-screen"></div>
          <div className="cinema-loader-spinner"></div>
          <p className="cinema-loader-title">Loading bookings...</p>
          <p className="cinema-loader-text">Finding your tickets</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='booking-dark-page'>
        <Navbar/>
        <div className='error-state-card'>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <div className='error-state-actions'>
            <button className='error-state-link' onClick={fetchBookings}>Retry</button>
            <Link to={`/`} className='error-state-link secondary'>Back to home</Link>
          </div>
        </div>
      </div>
    )
  }

  const activeBookings = bookings.filter((booking) => {
    return booking.bookingStatus !== "cancelled"
  })

  if(activeBookings.length === 0){
    return (
      <div className='booking-dark-page'>
        <Navbar/>
        <main className="flex flex-col items-center justify-center px-5 py-24 text-center">
          <div className='max-w-lg rounded-lg border border-zinc-800 bg-zinc-950 p-8'>
            <h2 className="text-3xl font-bold text-white">
              No bookings yet
            </h2>
            <p className="mt-3 text-zinc-400">
              Your booked movie tickets will appear here once you complete a payment.
            </p>
            <Link
              to={`/`}
              className='mt-6 inline-flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-500'
              onClick={() => sessionStorage.removeItem("selectedSeats")}
            >
              Back to home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  function handleCancelBooking(bookingId) {
  setBookingToCancel(bookingId);
  setShowCancelModal(true);
}
async function confirmCancelBooking() {
  if (!bookingToCancel) return;

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/bookings/${bookingToCancel}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const updatedBookings = bookings.map((booking) => {
      if (booking._id === bookingToCancel) {
        return response.data.booking;
      }

      return booking;
    });

    setBookings(updatedBookings);

    toast.success("Booking cancelled successfully!");
  } catch (error) {
    console.log(
      "Failed to cancel booking",
      error.response?.data || error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to cancel booking."
    );
  } finally {
    setShowCancelModal(false);
    setBookingToCancel(null);
  }
}

function cancelBookingModal() {
  setShowCancelModal(false);
  setBookingToCancel(null);
}

  return (
    <div className='booking-dark-page'>
      <Navbar/>
      <main className='page-fade-in mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 py-8'>
        <Link to={`/`} className='back-button'>&larr; Back to Home</Link>

        <div>
          <h1 className='text-3xl font-bold text-white'>My Bookings</h1>
          <p className='mt-1 text-zinc-400'>All your confirmed movie tickets are listed below.</p>
        </div>

        <div className='flex items-start gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4'>
          <InfoIcon fontSize="small" className='mt-0.5 text-zinc-500' />
          <p className='text-sm text-zinc-400'>Cancellations are only allowed up to 2 hours before the showtime begins.</p>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          {activeBookings.map((booking) => {
            const isConfirmed = booking.bookingStatus === "confirmed"

            return (
              <article className='rounded-lg border border-zinc-800 bg-zinc-950 p-5' key={booking._id}>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <h2 className='text-xl font-bold text-white'>{booking.movieName}</h2>
                      <p className='mt-1 text-sm text-zinc-500'>Reference: {booking.bookingReference}</p>
                    </div>
                    <span className={isConfirmed ? "text-sm font-semibold capitalize text-green-400" : "text-sm font-semibold capitalize text-red-400"}>
                      {booking.bookingStatus}
                    </span>
                  </div>
              )
            })}
          </div>
      </div>
      <ConfirmationModal
  isOpen={showCancelModal}
  title="Cancel Booking"
  message="Are you sure you want to cancel this booking?"
  confirmText="Cancel Booking"
  confirmButtonClass="bg-red-600 hover:bg-red-700"
  onCancel={cancelBookingModal}
  onConfirm={confirmCancelBooking}
/>
    </div>
  )
}

export default MyBookings
