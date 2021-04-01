const puppeteer = require("puppeteer");
const ENDPOINT = "https://www.nytimes.com/search?";

const scrapeNYT = async (term) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`${ENDPOINT}query=${term}`, {
      waitUntil: "domcontentloaded",
    });
    await page.evaluate(() => {
      const loadMoreTimes = 9;
      const searchButton = document.querySelector(
        '[data-testid="search-show-more-button"]'
      );
      for (let i = 0; i < loadMoreTimes; i++) {
        if (searchButton) {
          searchButton.click();
        }
      }
    });
    await page.waitForTimeout(500);
    const res = await page.evaluate(
      ({ term }) => {
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
            date: Date.parse(
              article
                .querySelector("span.css-17ubb9w")
                .getAttribute("aria-label")
            )
              ? new Date(
                  Date.parse(
                    article
                      .querySelector("span.css-17ubb9w")
                      .getAttribute("aria-label")
                  )
                ).toISOString()
              : new Date(Date.now()).toISOString(),
            popularity: 5, //set a default number, it will be further handled by algorithm
            url: article.querySelector("a").href,
            company: term,
          });
        });
        return posts;
      },
      { term }
    );
    await browser.close();
    return res;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { scrapeNYT };
