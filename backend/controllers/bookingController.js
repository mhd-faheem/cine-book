const Booking = require("../models/Booking");
const Show = require("../models/Show");

const createBooking = async (req, res) => {
  const {
    show,
    movieName,
    theatreName,
    screen,
    date,
    time,
    seats,
    seatAmount,
    convenienceFee,
    totalAmount,
  } = req.body;

  if (!show || !movieName || !theatreName || !screen || !date || !time) {
    return res.status(400).json({
      message: "Booking details are incomplete",
    });
  }

  if (!Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({
      message: "Selected seats are required",
    });
  }

  const showData = await Show.findById(show);

  if (!showData) {
    return res.status(404).json({
      message: "Show not found",
    });
  }

  const alreadyBookedSeats = seats.filter((seatId) => {
    return showData.bookedSeats.includes(seatId);
  });

  if (alreadyBookedSeats.length > 0) {
    return res.status(409).json({
      message: "Some seats are already booked",
      alreadyBookedSeats,
    });
  }

  showData.bookedSeats = [...showData.bookedSeats, ...seats];
  await showData.save();

  const booking = await Booking.create({
    user: req.user.id,
    show,
    movieName,
    theatreName,
    screen,
    date,
    time,
    seats,
    seatAmount,
    convenienceFee,
    totalAmount,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    bookingReference: `CBK-${Date.now()}`,
  });

  res.status(201).json({
    message: "Booking confirmed",
    booking,
  });
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(bookings);
};

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort({
    createdAt: -1,
  });

  res.json(bookings);
};

const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found",
    });
  }

  if (booking.bookingStatus === "cancelled") {
    return res.status(400).json({
      message: "Booking is already cancelled",
    });
  }

  booking.bookingStatus = "cancelled";
  await booking.save();

  await Show.findByIdAndUpdate(booking.show, {
    $pull: {
      bookedSeats: {
        $in: booking.seats,
      },
    },
  });

  res.json({
    message: "Booking cancelled",
    booking,
  });
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
};
