const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUserProfile,
  updateUser,
  logout,
  addCompany,
  likeMention,
  unlikeMention,
  sendReport,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/me", isAuthenticated, getUserProfile);
router.patch("/update", isAuthenticated, updateUser);
router.patch("/addcompany", isAuthenticated, addCompany);
router.patch("/likemention", isAuthenticated, likeMention);
router.patch("/unlikemention", isAuthenticated, unlikeMention);

router.get("/sendReport", isAuthenticated, sendReport); // for the demo
router.get("/logout", logout);

module.exports = router;
