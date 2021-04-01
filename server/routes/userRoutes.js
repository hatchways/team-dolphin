const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUserProfile,
  updateUser,
  logout,
  addCompany,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/me", isAuthenticated, getUserProfile);
router.patch("/update", isAuthenticated, updateUser);
router.patch("/addcompany", isAuthenticated, addCompany);

router.get("/logout", logout);

module.exports = router;
