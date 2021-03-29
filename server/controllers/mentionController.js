const Mention = require("../models/mentionModel");

// @desc    Get Mentions
// @route   GET /api/mentions
// @access  Private

/**
 * @param {string} platforms - list of selected platforms seperated by coma
 * @param {string} keyword - keyword entered by user in UI
 * @param {string} sort - either "popularity" for most popular or "date" for most recent
 * @param {number} page - page number for scrolling purposes
 */

const getPlatformsObject = (array) => {
  const platforms = [];
  array.map((platform) => platforms.push({ platform }));
  return platforms;
};

const getSortOption = (option) => {
  if (option === "date") {
    return { date: -1 };
  } else {
    return { popularity: -1 };
  }
};

const getMentions = async (req, res) => {
  try {
    const { platforms, page, keyword, sort } = req.query;
    if (!platforms) {
      res.status(201).json({ mentions: [] });
    } else {
      const platformsArray = platforms.split(",");
      const sortOption = sort ? sort : "date";
      const dataPage = page ? parseInt(req.query.page) : 1;
      const limit = 20;
      const startIndex = (dataPage - 1) * limit;
      const endIndex = dataPage * limit;
      let nextPage;
      let previousPage;

      // Fetching Mentions pertaining to selected platforms
      // Sorting handled by MongoDB
      const fetchMentions = async (array, sorting) => {
        const results = await Mention.find({
          $and: [
            {
              $or: [
                { title: { $regex: req.user.name, $options: "i" } },
                { content: { $regex: req.user.name, $options: "i" } },
              ],
            },
            { $or: [...getPlatformsObject(array)] },
          ],
        }).sort(getSortOption(sorting));

        return results;
      };

      const allMentions = await fetchMentions(platformsArray, sortOption);

      // filter by keyword
      let filteredMentions = [];
      if (!keyword) {
        filteredMentions = [...allMentions];
      } else {
        const keywordRegex = new RegExp(String.raw`${keyword.toLowerCase()}`);
        allMentions.forEach((mention) => {
          if (
            keywordRegex.test(mention.title.toLowerCase()) ||
            keywordRegex.test(mention.content.toLowerCase())
          ) {
            filteredMentions.push(mention);
          }
        });
      }

      if (endIndex < filteredMentions.length) {
        nextPage = dataPage + 1;
      }

      if (startIndex > 0) {
        previousPage = dataPage - 1;
      }

      const paginatedMentions = filteredMentions.slice(startIndex, endIndex);

      res.json({
        nbHits: filteredMentions.length,
        hitsPerPage: 20,
        page: dataPage,
        nextPage,
        previousPage,
        platforms: platformsArray,
        keyword,
        sort,
        mentions: paginatedMentions,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const getOneMention = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(404).json({ message: "No Mention ID provided" });
    } else {
      const fetchMention = async () => {
        const results = await Mention.find({ _id: id });
        res.status(201).json(results[0]);
      };
      fetchMention();
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

module.exports = { getMentions, getOneMention };
