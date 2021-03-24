const Mention = require("../models/mentionModel");
const { searchRecursive } = require("../utils/reddit");

// To be handled by BullMQ
const addMentionsToDB = async (company, platform) => {
  try {
    switch (platform) {
      case "reddit":
        const posts = await searchRecursive(company);
        await Mention.insertMany(posts);
        console.log(`${platform} is completed`);
        break;
      case "twitter":
        console.log(`${platform} is under construction`);
        break;
      case "facebook":
        console.log(`${platform} is under construction`);
        break;
      case "amazon":
        console.log(`${platform} is under construction`);
        break;
      case "forbes":
        console.log(`${platform} is under construction`);
        break;
      case "shopify":
        console.log(`${platform} is under construction`);
        break;
      case "businessinsider":
        console.log(`${platform} is under construction`);
        break;
      default:
        console.log(`oops! ${platform} is not inside our platform`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addMentionsToDB };
