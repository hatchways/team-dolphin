const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET
);

const sendWeeklyReport = (email, mentions) => {
  const htmlPart = mentions.map((mention) => <h1>{mention.title}</h1>);
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
        TextPart: "My first Mailjet email",
        HTMLPart: htmlPart,
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = sendWeeklyReport;
