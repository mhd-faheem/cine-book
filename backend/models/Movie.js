const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  genre: String,

  duration: Number,

  language: String,

  description: String,

  format: String,

  certification: String,

  rating: Number,

  banner: String,

  poster: String,
});

module.exports = mongoose.model("Movie", movieSchema);