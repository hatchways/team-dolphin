const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET
);

const sendWeeklyReport = (email, mentions) => {
  const shortenedMentions = mentions.map((mention) => {
    let { title, content } = mention;
    if (title.length > 50) {
      title = title.slice(0, 50).concat("...");
    }
    if (content.length > 180) {
      content = content.slice(0, 180).concat("...");
    }
    return {
      ...mention,
      title,
      content,
    };
  });

  const formMentionsHTML = () => {
    let string = "";
    shortenedMentions.forEach((mention) => {
      string += `
      <div style="width: 560px; height: 140px; background-color: #FFFFFF; border: 1px solid #EFEFEF; border-radius: 5px; margin: 1rem auto;">
        <img src=${mention.image} style="width: 100px; height: 100px; margin: 1rem; border: 1px solid #EFEFEF; float: left">
        <div style="max-width: 440px; display: inline; margin: 1rem;">
          <h4 style="margin: 0 0 0.5rem 0; font-weight: 500;">${mention.title}</h4>
          <h5 style="color: #CDCDCD; margin: 0 0 0.5rem 0;">Reddit</h5>
          <p style="color: #949494; margin: 0 0 0.5rem 0; ">${mention.content}</p>
        </div>
      </div>`;
    });
    return string;
  };

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "mentions-crawler@hotmail.com",
          Name: "mentionscrawler",
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: "Weekly Report",
        HTMLPart:
          `
          <body style="font-family: Arial, Helvetica, sans-serif; background-color: #F4F4F4;">
            <div style="max-width: 560px; height: 150px; margin: 1.875rem auto; background-color: #657DF2; color: #ffffff;">
              <span style="font-size: 2em; font-weight: bold; margin-left: 3rem; line-height: 160px;">
                WEEKLY REPORT
              </span>
              <span style="opacity: 0.2; font-size: 6.25em; margin-right: 3rem; line-height: 150px; float: right;">
                @
              </span>
            </div>
            <div>
              <div style="width: 560px; margin: 1.875rem auto;">
                <span style="font-size: 1.17em;">
                  Your mentions for this week:
                </span>
              </div>` +
          formMentionsHTML() +
          `
              <div style="width: 124px; height: 34px; margin: 2rem auto;">
                <a href="http://localhost:3000/login">
                  <button style="width: 170px; height: 56px; border: 0; background-color: #657Df2; color: #ffffff; border-radius: 50px;">
                    <h4>CHECK MORE</h4>
                  </button>
                </a>
              </div>
            </div>
          </body>`,
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendWeeklyReport;
