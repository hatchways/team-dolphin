const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const bodyParser = require('body-parser')
const connectDB = require('./config/dbtest')

const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const userRouter = require("./routes/userRoutes");

const { json, urlencoded } = express;

var app = express();
connectDB()

app.use(logger("dev"));
app.use(express.json()) // to accept JSON data in the body
// app.use(bodyParser.json())
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

module.exports = app;
