const puppeteer = require("puppeteer");
const ENDPOINT = "https://www.nytimes.com/search?";
const { sentimentHandler } = require("./jobHandler");

const scrapeNYT = async (term) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.exposeFunction("senti", sentimentHandler);
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

        articles.forEach(async (article) => {
          const cotentSelector = article.querySelector("p.css-16nhkrn");
          const titleSelector = article.querySelector("h4.css-2fgx4k");
          const imgSelector = article.querySelector("img.css-11cwn6f");
          const dateSelector = article
            .querySelector("span.css-17ubb9w")
            .getAttribute("aria-label");
          posts.push({
            content: cotentSelector
              ? cotentSelector.innerText
              : titleSelector.innerText,
            title: titleSelector.innerText,
            platform: "nyt",
            image: imgSelector ? imgSelector.src : "nytDefault",
            date: Date.parse(dateSelector)
              ? new Date(Date.parse(dateSelector)).toISOString()
              : new Date(Date.now()).toISOString(),
            popularity: 5, //set a default number, it will be further handled by algorithm
            url: article.querySelector("a").href,
            company: term,
            // sentiment: sentimentHandler(titleSelector.innerText),
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

// scrapeNYT("amazon");
module.exports = { scrapeNYT };
