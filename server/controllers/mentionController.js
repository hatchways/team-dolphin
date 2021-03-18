// const asyncHandler = require("express-async-handler");
const Mention = require("../models/mentionModel");

// @desc    Get Mentions
// @route   GET /api/mentions/
// @access  Private
const getMentions = async (req, res) => {
  try {
    const mentions = await Mention.find({});
    res.json(mentions);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "something went wrong" });
  }
};

module.exports = { getMentions };
