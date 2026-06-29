const Show = require("../models/Show");
require("../models/Theatre");

const getShowsByMovie = async (req, res) => {
  const shows = await Show.find({
    movie: req.params.movieId,
  }).populate("theatre", "name city location screens");

  res.json(shows);
};

const getShowById = async (req, res) => {
  const show = await Show.findById(req.params.showId)
    .populate("movie")
    .populate("theatre", "name city location screens");

  if (!show) {
    return res.status(404).json({
      message: "Show not found",
    });
  }

  res.json(show);
};

module.exports = {
  getShowsByMovie,
  getShowById,
};
