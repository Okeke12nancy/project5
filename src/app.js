const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middlewares/error");

// const connectDB = require("./config/db");
// const app = express();
// // Connect to database
// connectDB();

// Route files

const auth = require("./routes/auth");
const users = require("./routes/users");
const paystack = require("./routes/paystack");

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

module.exports = ({ app }) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Comic Bay Ready to go", error: false });
  });

  app.get("/health-check", (req, res) => {
    return res.status(200).json({ message: "All good here 😁" });
  });

  // Cookie parser
  app.use(cookieParser());
  // Sanitize data
  app.use(mongoSanitize());
  // Set security headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  app.use(limiter);

  // Prevent http param pollution
  app.use(hpp());

  // Enable CORS
  app.use(cors());

  // Mount routers

  app.use("/api/v1/auth", auth);
  app.use("/api/v1/users", users);
  app.use("/api/v1/", paystack);

  // Dev logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  /// catch 404 and forward to error handler
  app.use("*", (req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    res.status(404).json({
      message: "Not Found",
      error: true,
    });
    next();
  });
  app.use(errorHandler);
};
