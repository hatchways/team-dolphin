const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const User = require("./models/userModel");
const Mention = require("./models/mentionModel");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected for seeding purposes: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Mention.deleteMany();
    await User.insertMany(users);
    console.log("##### Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Mention.deleteMany();
    console.log("##### Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// cd server
// npm run data:import
// npm run dev
