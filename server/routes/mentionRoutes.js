const express = require("express");
const router = express.Router();
const { getMentions } = require("../controllers/mentionController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.get("/", getMentions);

module.exports = router;
