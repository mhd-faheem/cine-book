const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const connectDB = require("./config/db");


const app = express();

connectDB();

app.use(cors());

app.use(express.json());

const theatreRoutes = require("./routes/theatreRoutes");

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/theatres",theatreRoutes);

app.get("/", (req, res) => {
  res.send("CineBook API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serer has started on port ${PORT}`);
});