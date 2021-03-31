const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const User = require("./models/userModel");
const Mention = require("./models/mentionModel");
const { searchRecursive } = require("./utils/reddit");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB Connected for seeding purposes: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const importData = async () => {
  const mentions1 = await searchRecursive("Loblaws");
  const mentions2 = await searchRecursive("Airbus");
  const mentions3 = await searchRecursive("Pfizer");
  const mentions4 = await searchRecursive("Astrazeneca");
  const mentions5 = await searchRecursive("Walmart");
  try {
    await User.deleteMany();
    console.log("##### Users deleted!");
    await Mention.deleteMany();
    console.log("##### Mentions deleted!");
    await User.insertMany(users);
    console.log("##### Users inserted!");
    await Mention.insertMany(mentions1);
    console.log("##### Loblaws Mentions inserted!");
    await Mention.insertMany(mentions2);
    console.log("##### Airbus Mentions inserted!");
    await Mention.insertMany(mentions3);
    console.log("##### Pfizer Mentions inserted!");
    await Mention.insertMany(mentions4);
    console.log("##### Astrazeneca Mentions inserted!");
    await Mention.insertMany(mentions5);
    console.log("##### Walmart Mentions inserted!");
    console.log("##### All Data Imported!");
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
