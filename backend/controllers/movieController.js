const Movie = require("../models/Movie");

const getMovies = async (req, res) => {
  const movies = await Movie.find();

  res.json(movies);
};

module.exports = { getMovies };