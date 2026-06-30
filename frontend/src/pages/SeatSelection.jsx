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
  const [error, setError] = useState("")

  const fetchShow = async () => {
      setShow(null)
      setLoading(true)

      try {
        setError("")
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/shows/${showId}`)
        setShow(response.data)
      } catch (error) {
        console.log("Failed to fetch show", error)
        setError("Unable to load seats. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
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
      <div className='booking-dark-page'>
        <Navbar/>
        <div className='cinema-loader'>
          <div className='cinema-loader-screen'></div>
          <div className='cinema-loader-spinner'></div>
          <p className='cinema-loader-title'>Preparing seats...</p>
          <p className='cinema-loader-text'>Loading latest availability</p>
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
          <button className='error-state-link' onClick={fetchShow}>Retry</button>
        </div>
      </div>
    )
  }

  if (!show) {
    return (
      <div className='booking-dark-page'>
        <Navbar/>
        <div className='flex justify-center items-center mt-20 text-white'>
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
      const currentSelectedSeats = selectedSeats.length === tickets ? [] : selectedSeats
      const seatsNeeded = tickets - currentSelectedSeats.length
      const newSeats = autoSelectedSeats.filter((seatId) => {
        return !currentSelectedSeats.includes(seatId)
      })
      const seatsToAdd = newSeats.slice(0, seatsNeeded)

      setSelectedSeats([...currentSelectedSeats, ...seatsToAdd])
    } else if (selectedSeats.length <= tickets - 1) {
      setSelectedSeats([...selectedSeats, seat.id])
    } else {
      setSelectedSeats([seat.id])
    }
  }

  function handlePayment() {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", `/shows/${showId}/seats`)
      alert("Please login before booking your seats.")
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
    <div className='booking-dark-page'>
      <Navbar/>

      <div className='main-wrapper items-center page-fade-in'>
        <div className="top-section w-full px-4 pt-5 sm:px-6">
          <div className='mx-auto w-full max-w-5xl'>
            <Link
              to={`/movies/${movieData._id}/shows`}
              className='back-button'
              onClick={() => sessionStorage.removeItem("selectedSeats")}
            >
              &larr; Back
            </Link>

            <div className='mt-5 rounded-xl bg-[#0d0d0f] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_14px_34px_rgba(0,0,0,0.28)] sm:p-6'>
              <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
                <div>
                  <p className='text-2xl font-bold leading-tight text-white sm:text-3xl'>{movieData.title}</p>
                  <div className='mt-2 flex flex-col gap-1'>
                    <p className='text-base font-medium text-zinc-200 sm:text-lg'>
                      {show.theatre?.name} <span className='text-zinc-500'>-</span> {show.screen}
                    </p>
                    <p className='text-sm text-zinc-500'>
                      {show.date} at {show.time}
                    </p>
                  </div>
                </div>

                <div className='ticket-counter'>
                  <button type='button' aria-label='Decrease tickets' onClick={() => tickets > 1 ? setTickets(tickets - 1) : null}>-</button>
                  <div className='min-w-24 text-center'>
                    <p className='text-xl font-bold text-white'>{tickets}</p>
                    <p className='text-xs font-medium text-red-300'>{tickets === 1 ? "Ticket" : "Tickets"}</p>
                  </div>
                  <button type='button' aria-label='Increase tickets' onClick={() => tickets < 10 ? setTickets(tickets + 1) : null}>+</button>
                </div>
              </div>
            </div>

            <div className='flex justify-start mt-4 sm:justify-end'>
              <label className='flex items-center gap-2 text-sm cursor-pointer text-zinc-300'>
              <input
                type="checkbox"
                checked={autoSelectEnabled}
                onChange={(e) => setAutoSelectEnabled(e.target.checked)}
              />
              Auto-select nearby seats
              </label>
            </div>
          </div>
        </div>

        <div className='seat-ui flex flex-col justify-center align-middle items-center mt-8 mb-12 w-full px-3 text-zinc-200 sm:mt-10 sm:w-3/4 sm:px-4'>
          <div className='screen flex flex-col items-center gap-1 align-middle'>
            <div title="Theatre screen" className="screen-line w-70 bg-red-400 rounded-3xl"></div>
            <p className='mt-1.5 mb-9 text-zinc-400'>All eyes this way!</p>
          </div>

          <div className='selected-seats-info flex flex-col justify-center items-center mb-5'>
            {selectedSeats.length > 0 ? (
              <p className='text-sm text-zinc-200'>Selected Seats: {selectedSeats.join(', ')}</p>
            ) : (
              <p className='text-sm text-zinc-400'>Your perfect view is one tap away!</p>
            )}
          </div>

          <div className="seats-scroll">
          <div className="seats-grid">
            {displayTheatreLayout.map((item) => {
              const rowSeats = displaySeats.filter((seat) => seat.row === item.row)

              if (item.type === "blank") {
                return <div key={item.id} className='h-6'></div>
              }

              if (item.type === 'separator') {
                return (
                  <div key={item.id} className='mt-3 w-full'>
                    <p className='text-sm font-medium text-zinc-400'>{item.label} - &#8377;{item.price}</p>
                    <div className='w-full seat-separator'></div>
                  </div>
                )
              }

              if (item.type === "row") {
                return (
                  <div key={item.id} className='flex gap-3 items-center justify-center w-full'>
                    <p className='row-label mr-10 font-light text-zinc-500'>{item.row}</p>

                    {rowSeats.map((seat) => {
                      let seatBgColor = '#050505'
                      let seatTextColor = '#e4e4e7'
                      let seatCursor = 'pointer'
                      let seatOpacity = 100
                      let seatWidth = 40
                      let seatHeight = 40

                      if (selectedSeats.includes(seat.id)) {
                        seatBgColor = '#00b84a'
                        seatTextColor = 'white'
                      }

                      if (seat.status === "booked") {
                        seatBgColor = '#101010'
                        seatTextColor = '#a1a1aa'
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
                          className='seat-button font-medium cursor-pointer transition-all ease-in-out duration-100 rounded'
                          style={{
                            backgroundColor: seatBgColor,
                            color: seatTextColor,
                            cursor: seatCursor,
                            opacity: seatOpacity,
                            fontSize: '14px',
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
        </div>

        {selectedSeats.length > 0 ? (
          <button
            className='seat-pay-bar flex items-center align-middle justify-center gap-2 bg-red-600 p-3 text-white pay-button cursor-pointer transition-colors hover:bg-red-500'
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
