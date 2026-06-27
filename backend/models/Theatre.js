const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatId: {
      type: String,
      required: true,
    },
    row: {
      type: String,
      required: true,
    },
    number: Number,
    itemType: {
      type: String,
      enum: ["seat", "empty"],
      required: true,
    },
    category: {
      type: String,
      enum: ["standard", "premium", "sofa"],
    },
  },
  { _id: false }
);

const layoutItemSchema = new mongoose.Schema(
  {
    itemType: {
      type: String,
      enum: ["separator", "row", "blank"],
      required: true,
    },
    label: String,
    category: {
      type: String,
      enum: ["standard", "premium", "sofa"],
    },
    row: String,
  },
  { _id: false }
);

const screenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shows: [
      {
        type: String,
      },
    ],

    prices: {
      standard: {
        type: Number,
        required: true,
      },
      premium: {
        type: Number,
        required: true,
      },
      sofa: {
        type: Number,
        required: true,
      },
    },

    layout: [layoutItemSchema],

    seats: [seatSchema],
  },
  { _id: true }
);

const theatreSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    location: String,

    screens: [screenSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theatre", theatreSchema);