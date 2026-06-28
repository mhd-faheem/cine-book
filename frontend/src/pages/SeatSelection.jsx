import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../styles/SeatSelection.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext.jsx'
import axios from 'axios'

const SeatSelection = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { showId } = useParams()

  const savedTicketCount = Number(sessionStorage.getItem("selectedTicketCount"))
  const selectedTicketCount = location.state?.tickets || savedTicketCount || 1

  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const savedSeats = sessionStorage.getItem("selectedSeats")
    return savedSeats ? JSON.parse(savedSeats) : []
  })
  const [tickets, setTickets] = useState(selectedTicketCount)
  const [autoSelectEnabled, setAutoSelectEnabled] = useState(false)

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/shows/${showId}`)
        setShow(response.data)
      } catch (error) {
        console.log("Failed to fetch show", error)
      } finally {
        setLoading(false)
      }
    }

    fetchShow()
  }, [showId])

  useEffect(() => {
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))
  }, [selectedSeats])

  useEffect(() => {
    sessionStorage.setItem("selectedTicketCount", String(tickets))
  }, [tickets])

  if (loading) {
    return (
      <div>
        <Navbar/>
        <div className='flex justify-center items-center mt-20'>
          <p className='text-3xl font-bold'>Loading seats...</p>
        </div>
      </div>
    )
  }

  if (!show) {
    return (
      <div>
        <Navbar/>
        <div className='flex justify-center items-center mt-20'>
          <p className='text-3xl font-bold'>Show not found.</p>
        </div>
      </div>
    )
  }

  const movieData = show.movie
  const activeScreen = show.theatre?.screens?.find((screen) => {
    return screen.name === show.screen
  })

  const displaySeats = activeScreen?.seats?.map((seat) => {
    return {
      id: seat.seatId,
      row: seat.row,
      number: seat.number,
      status: show.bookedSeats?.includes(seat.seatId) ? "booked" : "available",
      type: seat.itemType,
      category: seat.category,
    }
  }) || []

  const displayTheatreLayout = activeScreen?.layout?.map((item, index) => {
    return {
      id: `${item.itemType}-${item.row || item.label || index}`,
      type: item.itemType,
      label: item.label,
      row: item.row,
      price: item.category ? activeScreen.prices[item.category] : undefined,
    }
  }) || []

  const displaySeatPrices = activeScreen
    ? [
        { category: "standard", price: activeScreen.prices.standard },
        { category: "premium", price: activeScreen.prices.premium },
        { category: "sofa", price: activeScreen.prices.sofa },
      ]
    : []

  const totalAmount = selectedSeats.reduce((sum, seatId) => {
    const seat = displaySeats.find((seat) => seat.id === seatId)
    const priceItem = displaySeatPrices.find((item) => item.category === seat?.category)

    return sum + (priceItem?.price || 0)
  }, 0)

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

  function handleSeatSelect(seat) {
    if (seat.type !== "seat" || seat.status === "booked") {
      return
    }

    if (selectedSeats.includes(seat.id)) {
      const updatedSeats = selectedSeats.filter((selectedSeat) => {
        return selectedSeat !== seat.id
      })

      setSelectedSeats(updatedSeats)
    } else if (autoSelectEnabled) {
      const autoSelectedSeats = getSequentialSeats(seat)
      const seatsNeeded = tickets - selectedSeats.length
      const newSeats = autoSelectedSeats.filter((seatId) => {
        return !selectedSeats.includes(seatId)
      })
      const seatsToAdd = newSeats.slice(0, seatsNeeded)

      setSelectedSeats([...selectedSeats, ...seatsToAdd])
    } else if (selectedSeats.length <= tickets - 1) {
      setSelectedSeats([...selectedSeats, seat.id])
    } else {
      setSelectedSeats([seat.id])
    }
  }

  function handlePayment() {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", `/shows/${showId}/seats`)
      navigate("/login")
      return
    }

    if (tickets !== selectedSeats.length) {
      return
    }

    navigate(`/shows/${showId}/seats/payment`, {
      state: {
        movieName: movieData.title,
        theatreName: show.theatre?.name,
        showDate: show.date,
        showTime: show.time,
        showId: show._id,
        screen: show.screen,
        selectedSeats,
        totalPrice: totalAmount,
      },
    })
  }

  return (
    <div>
      <Navbar/>

      <div className='main-wrapper items-center'>
        <div className="top-section p-5 w-full">
          <Link
            to={`/movies/${movieData._id}/shows`}
            className='back-button'
            onClick={() => sessionStorage.removeItem("selectedSeats")}
          >
            &larr; Back
          </Link>

          <div className='flex justify-between mt-3 items-center'>
            <div className='flex flex-col gap-0.5 '>
              <p className='text-2xl font-regular'>{movieData.title}</p>
              <p className='text-gray-700'>
                {show.theatre?.name} - {show.screen}
              </p>
              <p className='text-gray-500'>{show.date} at {show.time}</p>
            </div>

            <div className='ticket-counter'>
              <p className='font-regular text-red-500 underline cursor-pointer'>{tickets} Tickets</p>
              <button onClick={() => tickets < 10 ? setTickets(tickets + 1) : null}>+</button>
              <button onClick={() => tickets > 1 ? setTickets(tickets - 1) : null}>-</button>
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

        <div className='seat-ui flex flex-col justify-center align-middle items-center mt-10 mb-12 w-3/4'>
          <div className='screen flex flex-col items-center gap-1 align-middle'>
            <div title="Theatre screen" className="screen-line w-70 bg-red-400 rounded-3xl"></div>
            <p className='mt-1.5 mb-9'>All eyes this way!</p>
          </div>

          <div className='flex flex-col justify-center items-center mb-5'>
            {selectedSeats.length > 0 ? (
              <p className='text-sm'>Selected Seats: {selectedSeats.join(', ')}</p>
            ) : (
              <p className='text-sm'>Your perfect view is one tap away!</p>
            )}
          </div>

          <div className="seats flex flex-col gap-3">
            {displayTheatreLayout.map((item) => {
              const rowSeats = displaySeats.filter((seat) => seat.row === item.row)

              if (item.type === "blank") {
                return <div key={item.id} className='h-6'></div>
              }

              if (item.type === 'separator') {
                return (
                  <div key={item.id} className='mt-3'>
                    <p>{item.label} - &#8377;{item.price}</p>
                    <div className='w-full seat-separator bg-gray-400'></div>
                  </div>
                )
              }

              if (item.type === "row") {
                return (
                  <div key={item.id} className='flex gap-3 items-center justify-center w-full'>
                    <p className='row-label mr-10 font-light text-gray-600'>{item.row}</p>

                    {rowSeats.map((seat) => {
                      let seatBgColor = 'white'
                      let seatTextColor = 'black'
                      let seatCursor = 'pointer'
                      let seatOpacity = 100
                      let seatWidth = 40
                      let seatHeight = 40

                      if (selectedSeats.includes(seat.id)) {
                        seatBgColor = 'green'
                        seatTextColor = 'white'
                      }

                      if (seat.status === "booked") {
                        seatBgColor = 'grey'
                        seatCursor = 'not-allowed'
                      }

                      if (seat.type === "empty") {
                        seatOpacity = 0
                        seatCursor = 'default'
                      }

                      if (seat.category === "sofa") {
                        seatWidth = 50
                        seatHeight = 35
                      }

                      return (
                        <button
                          onClick={() => handleSeatSelect(seat)}
                          disabled={seat.status === "booked" || seat.type !== "seat"}
                          title={seat.status === "booked" ? "Seat is already booked!" : null}
                          key={seat.id}
                          className='font-medium shadow shadow-gray-300 cursor-pointer transition-colors ease-in-out duration-100 rounded'
                          style={{
                            backgroundColor: seatBgColor,
                            color: seatTextColor,
                            cursor: seatCursor,
                            opacity: seatOpacity,
                            fontSize: '15px',
                            width: seatWidth,
                            height: seatHeight,
                          }}
                        >
                          {seat.id}
                        </button>
                      )
                    })}
                  </div>
                )
              }
            })}
          </div>
        </div>

        {selectedSeats.length > 0 ? (
          <button
            className='flex items-center align-middle justify-center gap-2 p-3 w-1/3 bg-red-500 rounded text-white pay-button cursor-pointer left-1/2 -translate-x-1/2 sticky bottom-5'
            onClick={handlePayment}
          >
            Pay <span>&#8377;{totalAmount}</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default SeatSelection
