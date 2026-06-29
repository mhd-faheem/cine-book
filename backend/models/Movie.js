const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    genre: String,

    duration: String,

    language: String,

    description: String,

    format: String,

    certification: String,

    rating: Number,

    banner: String,

    poster: String,

    cast: [
      {
        name: String,
        image: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
