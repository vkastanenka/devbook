const express = require("express");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const profileRouter = require("./routes/profileRoutes");

const app = express();

// Set pug as template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

//////////////
// Middleware

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serving static files
app.use(express.static(path.join(__dirname, "client/build")));

// Implementing CORS
app.use(cors());
app.options("*", cors());

// Setting security headers
app.use(helmet());

// Implementing rate limiting: 500 requests every hour
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// Will now have X-RateLimit-Limit and X-RateLimit-Remaining headers
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL injection => Removes mongo operators
app.use(mongoSanitize());

// Data sanitization against XSS => Clean user input from malicious HTML input
app.use(xss());

// Preventing HTTP parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Compression of text sent to clients.
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/profiles", profileRouter);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Handling Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
