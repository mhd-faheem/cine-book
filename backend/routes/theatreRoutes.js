const express = require("express");

const router = express.Router();

const {
  getTheatresByMovie,
  createTheatre,
} = require("../controllers/theatreController");

router.get("/movie/:movieId", getTheatresByMovie);

router.post("/", createTheatre);

module.exports = router;