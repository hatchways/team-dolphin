var Twitter = require("twitter");
const ENDPOINT = "https://api.twitter.com/1.1/search/tweets.json";

var client = new Twitter({
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

const searchTwitter = async (term) => {
  try {
    var params = {
      q: term,
      count: 100,
      result_type: "mixed",
      include_entities: true,
      tweet_mode: "extended",
    };
    const { statuses } = await client.get(ENDPOINT, params);

    const posts = [];
    statuses.forEach((tweet) => {
      posts.push({
        content: tweet.full_text,
        title: tweet.full_text,
        platform: "twitter",
        image: tweet.entities.media
          ? tweet.entities.media[0].media_url
          : "twitterDefault",
        date: new Date(tweet.created_at),
        popularity: tweet.favorite_count,
        url: `https://twitter.com/${tweet.user.screen_name}/statuses/${tweet.id_str}`,
      });
    });
    return posts;
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { searchTwitter };
