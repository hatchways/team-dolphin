const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUserProfile,
  updatePlatforms,
  updateReportEmail,
  updateCompanies,
  updateActiveCompany,
  logout,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/me", isAuthenticated, getUserProfile);
router.patch("/update/platforms", isAuthenticated, updatePlatforms);
router.patch("/update/reportEmail", isAuthenticated, updateReportEmail);
router.patch("/update/companies", isAuthenticated, updateCompanies);
router.patch("/update/activeCompany", isAuthenticated, updateActiveCompany);

router.get("/logout", logout);

module.exports = router;
