const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUserProfile,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const protect = require("../middlewares/authMiddleware");

router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);
router.get("/profile", protect, getUserProfile);
router.get("/me", isAuthenticated, getUserProfile);

module.exports = router;
