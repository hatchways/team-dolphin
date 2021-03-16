const asyncHandler = require("express-async-handler");
const Mention = require("../models/mentionModel");

// @desc    Get Mentions
// @route   GET /api/mentions/
// @access  Private
const getMentions = asyncHandler(async (req, res) => {
  const { user } = req;
  try {

    //////////////////////////////////////////////////////////////////////
    // ///////////// Still working on getting mentions pertaining ////////
    // ///////////// to a selected platforms /////////////////////////////
    //////////////////////////////////////////////////////////////////////
    // const activePlatforms = [];
    // for (const [key, value] of Object.entries(user.platforms)) {
    //   if (value) {
    //     activePlatforms.push(key);
    //   }
    // }
    // if (activePlatforms[0] === "$init") {
    //   activePlatforms.shift();
    // }
    //
    // let allMentions = []
    // activePlatforms.forEach( async (platform) => {
    //   console.log(platform)
    //   const mentions = await Mention.find({platform})
    //   mentions.forEach(mention => allMentions.push(mention))
    //   console.log("inside forEach: " + allMentions)
    //   return allMentions})

    const mentions = await Mention.find({});
    res.json(mentions);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "something went wrong" });
  }
});

module.exports = { getMentions };
