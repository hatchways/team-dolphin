const mongoose = require("mongoose");

const mentionSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Mention", mentionSchema);
