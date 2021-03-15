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
  host: "127.0.0.1",
  port: 6379,
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
  redis: { port: 6379, host: "127.0.0.1" },
});

// job producers
const job = myFirstQueue.add({ foo: "bar" });
// myFirstQueue.add({ video: "http://example.com/video1.mov" });
// myFirstQueue.add({ audio: "http://example.com/audio1.mp3" });
// myFirstQueue.add({ image: "http://example.com/image1.tiff" });

// job consumer
myFirstQueue.process(function (job, done) {
  // transcode audio asynchronously and report progress
  job.progress(42);

  // call done when finished
  done(console.log(`Job with id ${job.id} has been completed`));

  // or give a error if error
  done(new Error("error transcoding"));

  // or pass it a result
  done(null, { samplerate: 48000 /* etc... */ });

  // If the job throws an unhandled exception it is also handled correctly
  throw new Error("some unexpected error");
});

module.exports = app;
