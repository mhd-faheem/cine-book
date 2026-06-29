const Movie = require("../models/Movie");

// GET all
const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

// GET by ID
const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
};

// POST - create movie
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - update movie
const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - remove movie
const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};