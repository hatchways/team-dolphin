// const asyncHandler = require("express-async-handler");
const Mention = require("../models/mentionModel");

// @desc    Get Mentions
// @route   GET /api/mentions?platforms=xxx&keywords=xxx&sortbydate=xxx&sortbypop=xxx
// @access  Private
const getMentions = async (req, res) => {
  try {
    // const { user } = req;
    const { platforms, keywords, sortbydate, sortbypop } = req.query;
    // Test HTTP request URL :
    // http://localhost:3001/api/mentions?platforms=reddit,twitter,facebook&keywords=bitcoin&sortbydate=asc&sortbypop=asc
    const platformsArray = platforms.split(",");
    const keywordsArray = keywords.split(",");

    // Fetching Mentions pertaining to selected platforms
    const fetchMentions = async (array) => {
      const allMentions = [];
      for (const platform of array) {
        const mentions = await Mention.find({ platform });
        allMentions.push(mentions);
      }
      return allMentions;
    };

    const result = await fetchMentions(platformsArray);
    const allMentions = result.flat();

    // TODO : filter by keyword  (scraping library or algorithm ?)
    // TODO : sort by sortbydate
    // TODO : sort by sortbypop

    res.json(allMentions);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "something went wrong" });
  }
};

module.exports = { getMentions };
