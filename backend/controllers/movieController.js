const Movie = require("../models/Movie");

const getMovies = async (req, res) => {
  const movies = await Movie.find();

  res.json(movies);
};

const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  res.json(movie);
};

module.exports = { getMovies, getMovieById };
