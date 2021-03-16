const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");

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
app.use("/api/users", userRouter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

// test redis
// to start redis server in background
// run "redis-server --daemonize yes"
// to stop the server running "redis-cli shutdown"
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
client.on("error", (err) => {
  console.log("Error " + err);
});

client.on("ready", function () {
  console.log("redis is running");
});

// test bull
var Queue = require("bull");

const myFirstQueue = new Queue("my-first-queue", {
  redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
});

// job producer
const job = myFirstQueue.add();

// job consumer
myFirstQueue.process(function (job, done) {
  // call done when finished
  done(console.log(`Job with id ${job.id} has been completed`));
});

module.exports = app;
