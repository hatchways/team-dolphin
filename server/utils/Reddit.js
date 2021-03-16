const axios = require("axios");
const ENDPOINT = "http://www.reddit.com/r/all/search.json";

const searchRecursive = async (term, after = "", posts = []) => {
  if (posts.length >= 100) return posts;

  let url = `${ENDPOINT}?q=${term}` + (after ? `&after=${after}` : "");

  try {
    const res = await axios.get(url);

    if (res.status === 200) {
      res.data.data.children.forEach((post) => {
        posts.push({
          content: post.data.url,
          title: post.data.title,
          platform: "reddit",
          image: post.data.thumbnail, // "self" or "default" if no thumbnail link
          date: new Date(post.data.created * 1000),
          popularity: post.data.ups,
        });
      });
      if (res.data.data.after) {
        searchRecursive(term, res.data.data.after, posts);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchRecursive };
