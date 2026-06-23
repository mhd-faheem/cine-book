const express = require("express");
const router = express.Router();
const {
  protect,
  adminOnly,
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

router.get(
  "/admin-dashboard",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;