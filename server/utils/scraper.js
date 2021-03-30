const Mention = require("../models/mentionModel");
const { searchRecursive } = require("../utils/reddit");
const { searchTwitter } = require("../utils/twitter");

// To be handled by BullMQ
const addMentionsToDB = async (company, platform) => {
  const updatePost = (posts) => {
    posts.forEach(async (post) => {
      const bool = await Mention.exists({ url: post.url });
      if (!bool) {
        await Mention.create(post);
      }
    });
  };

  try {
    switch (platform) {
      case "reddit":
        const reddits = await searchRecursive(company);
        updatePost(reddits);
        break;
      case "twitter":
        const tweets = await searchTwitter(company);
        updatePost(tweets);
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
