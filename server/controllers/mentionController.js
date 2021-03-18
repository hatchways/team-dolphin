const Mention = require("../models/mentionModel");

// @desc    Get Mentions
// @route   GET /api/mentions?platforms=xxx&keyword=xxx&sort=xxx
// @access  Private
const getMentions = async (req, res) => {
  try {
    const { platforms, keyword, sort } = req.query;
    const platformsArray = platforms.split(",");

    // Fetching Mentions pertaining to selected platforms
    const fetchMentions = (array) => {
      const allMentions = [];
      for (const platform of array) {
        const mentions = Mention.find({ platform });
        allMentions.push(mentions);
      }
      return allMentions;
    };

    const result = await Promise.all(fetchMentions(platformsArray));
    const allMentions = result.flat();

    // filter by keyword
    const keywordRegex = new RegExp(String.raw`${keyword}`);
    const filteredMentions = [];
    allMentions.forEach((mention) => {
      if (
        keywordRegex.test(mention.title.toLowerCase()) ||
        keywordRegex.test(mention.content.toLowerCase())
      ) {
        filteredMentions.push(mention);
      }
    });

    // sort by selector
    let sortedMentions = [];

    switch (sort) {
      case "popularity":
        const tempPopSorted = filteredMentions
          .map((mention) => {
            return [mention._id, mention.popularity];
          })
          .sort((a, b) => b[1] - a[1]);

        sortedMentions = tempPopSorted.map((item) =>
          filteredMentions.find((mention) => item[0] === mention._id)
        );

        break;
      default:
        const tempDateSorted = filteredMentions
          .map((mention) => {
            return [mention._id, Date.parse(mention.date)];
          })
          .sort((a, b) => b[1] - a[1]);

        sortedMentions = tempDateSorted.map((item) =>
          filteredMentions.find((mention) => item[0] === mention._id)
        );
    }

    res.json({ mentions: sortedMentions });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

module.exports = { getMentions };
