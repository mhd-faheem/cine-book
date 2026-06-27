const Theatre = require("../models/Theatre");

// Get all theatres for a movie
const getTheatresByMovie = async (req, res) => {
  try {
    const theatres = await Theatre.find({
      movieId: req.params.movieId,
    });

    res.status(200).json(theatres);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Create a new theatre
const createTheatre = async (req, res) => {
  try {
    console.log("POST /api/theatres");
    console.log(req.body);

    const theatre = new Theatre(req.body);

    const savedTheatre = await theatre.save();

    res.status(201).json(savedTheatre);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getTheatresByMovie,
  createTheatre,
};