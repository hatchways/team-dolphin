const Mention = require("../models/mentionModel"); // Added for Co-op Midterm Presentation
const { searchRecursive } = require("../utils/reddit"); // Added for Co-op Midterm Presentation


      // Added for Co-op Midterm Presentation
      // To be handled later on by BullMQ
      const addMentionsToDB = async () => {
        try {
          const posts = await searchRecursive(user.name);
          await Mention.deleteMany();
          await Mention.insertMany(posts);
        } catch (error) {
          console.log(error.message);
        }
      };

module.exports = { addMentionsToDB };