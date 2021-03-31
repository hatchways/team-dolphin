const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUserProfile,
  updatePlatforms,
  sendReport,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/me", isAuthenticated, getUserProfile);
router.patch("/platforms", isAuthenticated, updatePlatforms);
router.get("/sendReport", isAuthenticated, sendReport); // for the demo

module.exports = router;
