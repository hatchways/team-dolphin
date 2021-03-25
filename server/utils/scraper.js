const Mention = require("../models/mentionModel");
const { searchRecursive } = require("../utils/reddit");

// To be handled by BullMQ
const addMentionsToDB = async (company, platform) => {
  try {
    switch (platform) {
      case "reddit":
        const posts = await searchRecursive(company);
        posts.forEach(async (post) => {
          const bool = await Mention.exists({ url: post.url });
          if (!bool) {
            await Mention.create(post);
          }
        });
        break;
      case "twitter":
        break;
      case "facebook":
        break;
      case "amazon":
        break;
      case "forbes":
        break;
      case "shopify":
        break;
      case "businessinsider":
        break;
      default:
        console.log(`oops! ${platform} is not inside our platform`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addMentionsToDB };
