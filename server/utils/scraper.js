const Mention = require("../models/mentionModel");
const { searchRecursive } = require("../utils/reddit");

// To be handled by BullMQ
const addMentionsToDB = async (company, platform) => {
  try {
    switch (platform) {
      case "reddit":
        const posts = await searchRecursive(company);
        await Mention.insertMany(posts);
      case "twitter":

      case "facebook":

      case "amazon":

      case "forbes":

      case "shopify":

      case "businessinsider":

      default:
        console.log(`oops! ${platform} is not inside our platform`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addMentionsToDB };
