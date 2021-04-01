const Sentiment = require("sentiment");

var sentiment = new Sentiment();
const sentimentHandler = (context) => {
  const evaluation = sentiment.analyze(context).comparative;
  if (evaluation > 0) {
    return "positive";
  } else if (evaluation < 0) {
    return "negative";
  } else {
    return "neutral";
  }
};

module.exports = { sentimentHandler };
