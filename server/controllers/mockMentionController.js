// File created to test pagination + infinite scrolling

const Mention = require('../models/mentionModel');

// @desc    Get Mentions
// @route   GET /api/mentions
// @access  Private

/**
 * @param {string} platforms - list of selected platforms seperated by coma
 * @param {string} keyword - keyword entered by user in UI
 * @param {string} sort - either "popularity" for most popular or "date" for most recent
 * @param {number} page - page number for scrolling
 */

const getMentions = async (req, res) => {
  try {
    const { platforms, page, keyword, sort } = req.query;
    if (!platforms) {
      res.status(201).json({ mentions: [] });
    } else {
      const platformsArray = platforms.split(',');
      const dataPage = page ? parseInt(req.query.page) : 1;
      const limit = 20;
      const startIndex = (dataPage - 1) * limit;
      const endIndex = dataPage * limit;
      let nextPage;
      let previousPage;

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
      // console.log('######### all mentions #############');
      // console.log(allMentions.length);

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

      // console.log('######### filtered mentions #############');
      // console.log(filteredMentions.length);
      // console.log(filteredMentions[0]);

      // sort by selector
      let sortedMentions = [];

      switch (sort) {
        case 'popularity':
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

      if (endIndex < allMentions.length) {
        nextPage = dataPage + 1;
      }

      if (startIndex > 0) {
        previousPage = dataPage - 1;
      }

      const paginatedMentions = sortedMentions.slice(startIndex, endIndex);
      console.log('######### paginatedMentions #############');
      console.log(paginatedMentions.length);
      console.log(paginatedMentions[0]);

      res.json({
        nbHits: sortedMentions.length,
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
    res.status(400).json({ message: 'something went wrong' });
  }
};

module.exports = { getMentions };
