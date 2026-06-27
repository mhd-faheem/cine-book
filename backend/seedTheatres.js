const mongoose = require("mongoose");
require("dotenv").config();

const Theatre = require("./models/Theatre");

const seedTheatres = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Theatre.create({
  name: "PVR Cinemas",
  location: "Kochi",
  screen: "Screen 1",
  format: "IMAX",
  movieIds: ["6a3e7e33f01b430ad4de0d22"]
});
await Theatre.create({
  name: "PVR Cinemas",
  location: "Kochi",
  screen: "Screen 1",
  format: "IMAX",
  movieIds: ["6a3e7e33f01b430ad4de0d22"]
});
await Theatre.create({
  name: "PVR Cinemas",
  location: "Kochi",
  screen: "Screen 1",
  format: "IMAX",
  movieIds: ["6a3e7e33f01b430ad4de0d22"]
});
await Theatre.create({
  name: "PVR Cinemas",
  location: "Kochi",
  screen: "Screen 1",
  format: "IMAX",
  movieIds: ["6a3e7e33f01b430ad4de0d22"]
});
await Theatre.create({
  name: "PVR Cinemas",
  location: "Kochi",
  screen: "Screen 1",
  format: "IMAX",
  movieIds: ["6a3e7e33f01b430ad4de0d22"]
});
await Theatre.create({
  name: "PVR Cinemas",
  location: "Kochi",
  screen: "Screen 1",
  format: "IMAX",
  movieIds: ["6a3e7e33f01b430ad4de0d22"]
});

    console.log("Theatre seeded successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedTheatres();