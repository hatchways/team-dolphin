const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API_KEY || "09c3b2a50111930bf73775e7a833a797",
  process.env.MAILJET_SECRET || "c6c1ef249dae9f25c70c478089fdd29b"
);

const sendWeeklyReport = (email, mentions) => {
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
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
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

// for testing
const myMentions = [
  { title: "Mention 1", content: "Description of Mention 1" },
  { title: "Mention 2", content: "Description of Mention 2" },
  { title: "Mention 3", content: "Description of Mention 3" },
];

sendWeeklyReport("atran96.dev@gmail.com", myMentions);

module.exports = sendWeeklyReport;
