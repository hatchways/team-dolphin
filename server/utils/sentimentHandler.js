const Sentiment = require("sentiment");

var sentiment = new Sentiment();
const sentimentHandler = (context) => {
  return sentiment.analyze(context).comparative;
};

module.exports = { sentimentHandler };
