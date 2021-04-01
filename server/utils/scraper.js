const Mention = require("../models/mentionModel");
const { searchRecursive } = require("../utils/reddit");
const { searchTwitter } = require("../utils/twitter");
const { scrapeNYT } = require("../utils/nyt.js");

// To be handled by BullMQ
const addMentionsToDB = async (company, platform) => {
  const updatePost = async (posts) => {
    if (posts) {
      for (const post of posts) {
        try {
          const bool = await Mention.exists({ url: post.url });
          if (!bool) {
            await Mention.create(post);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
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
      case "nyt":
        const articles = await scrapeNYT(company);
        updatePost(articles);
        break;
      default:
        console.log(`oops! ${platform} is not inside our platform`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
addMentionsToDB("a", "b");
module.exports = { addMentionsToDB };
