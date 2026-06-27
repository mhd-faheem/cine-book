const Theatre = require("../models/Theatre");

const getTheatresByMovie = async (req, res) => {
  try {
    const theatres = await Theatre.find({
      movieId: req.params.movieId,
    });

    res.json(theatres);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getTheatresByMovie,
};