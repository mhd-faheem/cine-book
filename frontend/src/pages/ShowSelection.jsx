import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ShowSelection = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

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

  if (!movie) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center mt-20">
          <p className="text-3xl font-bold">Loading shows...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <Link to={`/movies/${id}`} className="back-button">
          &larr; Back to movie
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600 mt-1">Choose a date and showtime</p>
        </div>

        {shows.length === 0 ? (
          <p className="mt-8">No shows available for this movie.</p>
        ) : (
          <>
            <div className="flex gap-3 mt-8 flex-wrap">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={
                    selectedDate === date
                      ? "px-4 py-2 rounded bg-red-500 text-white cursor-pointer"
                      : "px-4 py-2 rounded border border-gray-300 cursor-pointer"
                  }
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {filteredShows.map((show) => (
                <div
                  key={show._id}
                  className="border border-gray-300 rounded-xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                >
                  <p className="text-xl font-semibold">
                    {show.theatre?.name}
                  </p>
                  <p className="text-gray-600">
                    {show.theatre?.location}, {show.theatre?.city}
                  </p>
                  <p className="mt-2">
                    {show.screen} - {show.time}
                  </p>

                  <Link
                    to={`/movies/${id}/seats`}
                    state={{ show }}
                    className="inline-block mt-4 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Select Seats
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowSelection;
