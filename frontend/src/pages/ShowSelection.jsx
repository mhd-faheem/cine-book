import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/SeatSelection.css";

const ShowSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShow, setSelectedShow] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [error, setError] = useState("");
  const [isModalClosing, setIsModalClosing] = useState(false);
  const closeTimeoutRef = useRef(null);

  const getDateKey = (dateValue) => {
    return String(dateValue || "").slice(0, 10);
  };

  const fetchPageData = async () => {
      setMovie(null);

      try {
        setError("");
        const movieResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/movies/${id}`
        );
        const showsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/shows/movie/${id}`
        );

        setMovie(movieResponse.data);
        setShows(showsResponse.data);

        if (showsResponse.data.length > 0) {
          setSelectedDate(getDateKey(showsResponse.data[0].date));
        }
      } catch (error) {
        console.log("Failed to fetch show selection data", error);
        setError("Unable to load showtimes. Please try again later.");
      }
    };

  useEffect(() => {
    fetchPageData();
  }, [id]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const availableDates = [...new Set(shows.map((show) => getDateKey(show.date)))];

  const filteredShows = shows.filter((show) => {
    return getDateKey(show.date) === selectedDate;
  });

  const groupedShows = filteredShows.reduce((groups, show) => {
    const groupKey = `${show.theatre?._id}-${show.screen}`;

    if (!groups[groupKey]) {
      groups[groupKey] = {
        theatre: show.theatre,
        screen: show.screen,
        shows: [],
      };
    }

    groups[groupKey].shows.push(show);

    return groups;
  }, {});

  const showGroups = Object.values(groupedShows);

  const duplicateDayMonthKeys = availableDates.reduce((counts, dateValue) => {
    const [, month, day] = dateValue.split("-");
    const key = `${month}-${day}`;

    counts[key] = (counts[key] || 0) + 1;

    return counts;
  }, {});

  const formatDateLabel = (dateValue) => {
    const [year, month, day] = getDateKey(dateValue).split("-");
    const shouldShowYear = duplicateDayMonthKeys[`${month}-${day}`] > 1;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    const label = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      weekday: "short",
      timeZone: "UTC",
    });

    if (!shouldShowYear) {
      return label;
    }

    return `${label} '${String(date.getFullYear()).slice(2)}`;
  };

  const openTicketModal = (show) => {
    setIsModalClosing(false);
    setSelectedShow(show);
    setTicketCount(1);
  };

  const closeTicketModal = () => {
    setIsModalClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedShow(null);
      setIsModalClosing(false);
    }, 180);
  };

  const handleSelectSeats = () => {
    sessionStorage.setItem("selectedTicketCount", String(ticketCount));

    navigate(`/shows/${selectedShow._id}/seats`, {
      state: {
        tickets: ticketCount,
      },
    });
  };

  if (error) {
    return (
      <div className="booking-dark-page">
        <Navbar />
        <div className="error-state-card">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <div className="error-state-actions">
            <button className="error-state-link" onClick={fetchPageData}>Retry</button>
            <Link to={`/movies/${id}`} className="error-state-link secondary">Back to movie</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="booking-dark-page">
        <Navbar />
        <div className="cinema-loader">
          <div className="cinema-loader-screen"></div>
          <div className="cinema-loader-spinner"></div>
          <p className="cinema-loader-title">Finding showtimes...</p>
          <p className="cinema-loader-text">Checking available theatres</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-dark-page">
      <Navbar />

      <main className="page-fade-in mx-auto w-full max-w-5xl px-5 py-8">
        <Link to={`/movies/${id}`} className="back-button">
          &larr; Back to movie
        </Link>

        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          <p className="mt-1 text-zinc-400">Choose a date and showtime</p>
        </div>

        {shows.length === 0 ? (
          <p className="mt-8 text-zinc-400">No shows available for this movie.</p>
        ) : (
          <>
            <div className="flex gap-3 mt-8 flex-wrap">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={
                    selectedDate === date
                      ? "px-4 py-2 rounded-lg bg-zinc-900 text-red-300 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.55)] cursor-pointer"
                      : "px-4 py-2 rounded-lg bg-zinc-950 text-zinc-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] cursor-pointer hover:text-white hover:bg-zinc-900"
                  }
                >
                  {formatDateLabel(date)}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {showGroups.map((group) => (
                <div
                  key={`${group.theatre?._id}-${group.screen}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
                >
                  <p className="text-xl font-semibold text-white">
                    {group.theatre?.name}
                  </p>
                  <p className="mt-1 text-zinc-400">
                    {group.theatre?.location}, {group.theatre?.city}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    {group.screen}
                  </p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    {group.shows.map((show) => (
                      <button
                        key={show._id}
                        onClick={() => openTicketModal(show)}
                        className="rounded-lg bg-zinc-900 px-5 py-2.5 text-base font-semibold text-white shadow-[0_0_10px_rgba(255,255,255,0.06)] cursor-pointer hover:bg-red-600"
                      >
                        {show.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {selectedShow && (
        <div className={`${isModalClosing ? "modal-fade-out" : "modal-fade"} fixed inset-0 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm`}>
          <div className={`${isModalClosing ? "modal-scale-out" : "modal-pop"} w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)]`}>
            <h2 className="text-2xl font-bold text-white">Select Tickets</h2>
            <p className="text-zinc-400 mt-2">
              {selectedShow.theatre?.name} - {selectedShow.screen}
            </p>
            <p className="text-zinc-500">
              {selectedShow.date} at {selectedShow.time}
            </p>

            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => ticketCount > 1 ? setTicketCount(ticketCount - 1) : null}
                className="w-10 h-10 rounded-full bg-black text-xl text-white shadow-[0_0_10px_rgba(255,255,255,0.07)] cursor-pointer"
              >
                -
              </button>

              <p className="text-3xl font-bold w-12 text-center text-white">{ticketCount}</p>

              <button
                onClick={() => ticketCount < 10 ? setTicketCount(ticketCount + 1) : null}
                className="w-10 h-10 rounded-full bg-black text-xl text-white shadow-[0_0_10px_rgba(255,255,255,0.07)] cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={closeTicketModal}
                className="flex-1 rounded-lg bg-zinc-800 py-2 text-zinc-200 cursor-pointer hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={handleSelectSeats}
                className="flex-1 rounded-lg bg-red-600 text-white py-2 cursor-pointer hover:bg-red-500"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSelection;
