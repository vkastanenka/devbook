const express = require("express");
const morgan = require("morgan");
const path = require("path");

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

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
});

module.exports = app;
