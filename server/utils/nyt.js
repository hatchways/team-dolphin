const puppeteer = require("puppeteer");
const ENDPOINT = "https://www.nytimes.com/";

const scrapeNYT = async (term) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(ENDPOINT, { waitUntil: "load" });
    await page.click(".css-tkwi90");
    await page.type(".css-tkwi90", term);
    await page.click(".css-1gudca6");
    await page.waitForSelector("#search-results");

    var rawDatas = await page.evaluate(() => {
      let posts = document.body.querySelectorAll("#search-bodega-result");
      postItems = [];

      posts.forEach((item) => {
        let title = "";
        let link = "";
        try {
          title = item.querySelector("h4").innerText;
          if (title != "") {
            link = item.querySelector("a").href;
            postItems.push({ title: title, link: link });
          }
        } catch (e) {}
      });
      var items = {
        posts: postItems,
      };

      return items;
    });
    console.log(rawDatas);

    await browser.close();
  } catch (err) {
    console.log(err);
  }
};
scrapeNYT();
module.exports = { scrapeNYT };
