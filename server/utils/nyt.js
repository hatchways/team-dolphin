const puppeteer = require("puppeteer");
const ENDPOINT = "https://www.nytimes.com/search?";

const scrapeNYT = async (term) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${ENDPOINT}query=${term}`);
    await page.evaluate(() => {
      const loadMoreTimes = 9;
      for (let i = 0; i < loadMoreTimes; i++) {
        document
          .querySelector('[data-testid="search-show-more-button"]')
          .click();
      }
    });
    await page.waitForTimeout(500);
    const res = await page.evaluate(() => {
      let articles = document.body.querySelectorAll(".css-1l4w6pd");

      const posts = [];
      articles.forEach((article) => {
        posts.push({
          content: article.querySelector("p.css-16nhkrn")
            ? article.querySelector("p.css-16nhkrn").innerText
            : article.querySelector("h4.css-2fgx4k").innerText,
          title: article.querySelector("h4.css-2fgx4k").innerText,
          platform: "nyt",
          image: article.querySelector("img.css-11cwn6f")
            ? article.querySelector("img.css-11cwn6f").src
            : "nytDefault",
          date: new Date(
            article.querySelector("span.css-17ubb9w").getAttribute("aria-label")
          ).toISOString(),
          popularity: 5, //set a default number, it will be further handled by algorithm
          url: article.querySelector("a").href,
        });
      });
      return posts;
    });
    await browser.close();
    return res;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { scrapeNYT };
