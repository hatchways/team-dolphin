const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
      company: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
    }
  );

  module.exports = mongoose.model('User', userSchema);