const express = require("express");
const router = express.Router();
const { getMentions } = require("../controllers/mentionController");
const protect = require("../middlewares/authMiddleware");

router.get("/", isAuthenticated, getMentions);

module.exports = router;
