const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const mentionRouter = require("./routes/mentionRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const {
  connectRedis,
  handleTaskQueues,
  handleSendWeeklyReport,
} = require("./utils/jobHandler");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

connectRedis(); // if error, try start redis server in background

handleTaskQueues();
handleSendWeeklyReport();

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(express.json()); // to accept JSON data in the body
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/api/mentions", mentionRouter);
app.use("/api/users", userRouter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
