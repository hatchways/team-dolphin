const ENDPOINT = "http://www.reddit.com/r/all/search.json";

// const Reddit = {
//   search(term, limit) {
//     fetch(`${ENDPOINT}?q=${term}&limit=${limit}`)
//       .then((res) => {
//         if (res.ok) return res.json();
//         throw Error("Request failed");
//       })
//       .then((res) => {
//         console.log(res.data);
//         return res.data.children.map((post) => ({
//           content: post.data.url,
//           title: post.data.title,
//           platform: "reddit",
//           image: post.data.thumbnail, // "self" or "default" if no thumbnail link
//           date: new Date(post.data.created * 1000),
//           popularity: post.data.ups,
//         }));
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   },
// };

const searchRecursive = (term, after, posts) => {
  if (posts.length >= 100) return;

  let url =
    `http://www.reddit.com/r/all/search.json?q=${term}` +
    (after ? `&after=${after}` : "");

  fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      else throw Error("Request failed");
    })
    .then((res) => {
      res.data.children.forEach((post) => {
        posts.push({
          content: post.data.url,
          title: post.data.title,
          platform: "reddit",
          image: post.data.thumbnail, // "self" or "default" if no thumbnail link
          date: new Date(post.data.created * 1000),
          popularity: post.data.ups,
        });
      });
      if (res.data.after) {
        searchRecursive(term, res.data.after, posts);
      }
    });
};

export default searchRecursive;
