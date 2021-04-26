const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const mentionRouter = require("./routes/mentionRoutes");
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

app.use("/api/mentions", mentionRouter);
app.use("/api/users", userRouter);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.use("/", indexRouter);
  app.use("/ping", pingRouter);
}

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
