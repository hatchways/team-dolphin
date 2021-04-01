const express = require("express");
const router = express.Router();
const {
  getMentions,
  getOneMention,
} = require("../controllers/mentionController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, getMentions);
router.get("/mention", isAuthenticated, getOneMention);

module.exports = router;
