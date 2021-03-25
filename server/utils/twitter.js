var Twitter = require("twitter");
const ENDPOINT = "https://api.twitter.com/1.1/search/tweets.json";
const fakeImage = "https://imgflip.com/i/2i347c";

var client = new Twitter({
  consumer_key: process.env.TWITTER_APP_API_KEY,
  consumer_secret: process.env.TWITTER_APP_API_SECRET,
  //   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  //   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  bearer_token:
    process.env.TWITTER_BEARER_TOKEN ||
    "AAAAAAAAAAAAAAAAAAAAAGPtNwEAAAAA41i1rTm2rPkn5tcBANWnm1k6FT8%3DWQe72b1ol3VFGjKz7kgkaH3uZMsnCJ1bHlMYyDvcdGJ2HUUYDH",
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
      //   console.log(tweet.entities.urls);
      posts.push({
        content: tweet.full_text,
        title: tweet.full_text,
        platform: "twitter",
        image: tweet.entities.media
          ? tweet.entities.media[0].media_url
          : fakeImage,
        date: new Date(tweet.created_at),
        popularity: tweet.favorite_count,
        url: tweet.id,
      });
    });
    console.log(posts);
    return posts;
  } catch (err) {
    console.log(err.message);
  }
};
searchTwitter("ak");
module.exports = { searchTwitter };
