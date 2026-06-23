const express = require("express");
const router = express.Router();
const {
  protect,
} = require("../middleware/authMiddleware");

const {
  signup,
  login,
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;