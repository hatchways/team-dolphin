const mongoose = require("mongoose");

const mentionSchema = mongoose.Schema(
    {
      company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company',
      },
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
        // We might want to add a default ?
      },
      date: {
        type: Date,
        required: true,
      },
      popularity: {
        type: Number,
        default: 0,
      },
    }
  );

  module.exports = mongoose.model('Mention', mentionSchema);