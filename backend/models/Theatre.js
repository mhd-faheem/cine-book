const mongoose = require("mongoose");

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
  {
    _id: false,
  }
);

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
  {
    _id: false,
  }
);

const screenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

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
  {
    timestamps: true,
  }
);

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    screens: [screenSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theatre", theatreSchema);
