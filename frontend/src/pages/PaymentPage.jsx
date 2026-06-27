import React from 'react'
import Navbar from '../components/Navbar'
import { Link, useLocation, useParams } from 'react-router-dom'

const PaymentPage = () => {
  const location = useLocation()
  const bookingData = location.state
  
  const params = useParams()
  let movieId = params.id

  if(!location.state){
      return (
          <div>
            <Navbar/>
            <div className='flex flex-col justify-center items-center mt-10'>
            <p className='text-2xl font-medium'>No seats selected. Please return to Seat selection page.</p>
            <Link to={`/movies/${movieId}/seats`} className='back-button ml-5 mt-2.5'>&larr; Back</Link>
            </div>
          </div>

      )
    }

  const movieName = bookingData.movieName
  const theatreName = bookingData.theatreName
  const selectedSeats = bookingData.selectedSeats
  const totalPrice = bookingData.totalPrice
  const convFee = totalPrice * 2.7/100
  const finalPrice = totalPrice + convFee

  

  console.log(location.state)


  console.log(bookingData)
  return (
    <div className='main-wrapper'>
      {/* Navbar Component */}
      <Navbar/>
        <Link to={`/movies/${movieId}/seats`} className='back-button ml-5 mt-2.5'>&larr; Back</Link>
      <div className='flex justify-center'>
        <div className="booking-details flex flex-col p-8 bg-gray-100 w-1/3 border rounded border-dashed border-2 border-gray-600 mt-10">
          <div className='flex justify-center'>
            <p className='text-3xl mb-10 font-bold underline'>Payment Summary</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p><b>Movie:</b> {movieName}</p>
            <p><b>Theatre:</b> {theatreName}</p>
            <p><b>Showtime:</b> Showtime</p>
            <p><b>Date:</b> dd-mm-yyyy</p>
            <p><b>Seats selected:</b> {selectedSeats.join(", ")}</p>
            <div className='w-full bg-gray-400 mt-2 mb-2' style={{height: "1px"}}></div>
            <p><b>Booking Fee:</b> &#8377;{totalPrice}</p>
            <p><b>Convenience Fee: </b>&#8377;{convFee}</p>
            <p><b>Total Fee: </b>&#8377;{finalPrice}</p>
            <div className='flex justify-center'>
              <button className='p-3 bg-red-500 text-white rounded-xl mt-6 cursor-pointer'>Confirm payment</button>
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default PaymentPage
