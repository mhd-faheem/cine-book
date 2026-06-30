import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const movieResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/movies/${id}`
        );
        const showsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/shows/movie/${id}`
        );

        setMovie(movieResponse.data);
        setShows(showsResponse.data);

        if (showsResponse.data.length > 0) {
          setSelectedDate(showsResponse.data[0].date);
        }
      } catch (error) {
        console.log("Failed to fetch show selection data", error);
      }
    };

    fetchPageData();
  }, [id]);

  const availableDates = [...new Set(shows.map((show) => show.date))];

  const filteredShows = shows.filter((show) => {
    return show.date === selectedDate;
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

  const openTicketModal = (show) => {
    setSelectedShow(show);
    setTicketCount(1);
  };

  const closeTicketModal = () => {
    setSelectedShow(null);
  };

  const handleSelectSeats = () => {
    sessionStorage.setItem("selectedTicketCount", String(ticketCount));

    navigate(`/shows/${selectedShow._id}/seats`, {
      state: {
        tickets: ticketCount,
      },
    });
  };

  if (!movie) {
    return (
      <div className="booking-dark-page">
        <Navbar />
        <div className="flex justify-center items-center mt-20 text-white">
          <p className="text-3xl font-bold">Loading shows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-dark-page">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-5 py-8">
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
                      ? "px-4 py-2 rounded-lg bg-red-600 text-white cursor-pointer"
                      : "px-4 py-2 rounded-lg bg-zinc-950 text-zinc-300 shadow-[0_0_10px_rgba(255,255,255,0.06)] cursor-pointer hover:text-white"
                  }
                >
                  {date}
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
        <div className="modal-fade fixed inset-0 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="modal-pop w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
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
