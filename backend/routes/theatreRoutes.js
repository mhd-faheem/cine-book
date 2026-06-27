const express = require("express");

const router = express.Router();

const {
  getTheatresByMovie,
} = require("../controllers/theatreController");

router.get("/movie/:movieId", getTheatresByMovie);

module.exports = router;