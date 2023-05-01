const express = require("express");
const app = require("./app");
const { logger } = require("./helpers/logger");
const { connectDB, disconnectDB } = require("./config/db");

async function startServer() {
  const expressApp = express();

  app({ app: expressApp });

  try {
    await connectDB();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  expressApp
    .listen(process.env.PORT, () => {
      console.log(`
      ################################################
      🪐  Server listening on port: ${process.env.PORT} 🪐
      ################################################
    `);
      logger.info(`Server started`);
    })
    .on("error", async (err) => {
      logger.error(err);
      await disconnectDB();
      process.exit(1);
    });
}

startServer()
  .then(() => {
    console.log("Server started...");
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (reason, p) => {
  console.log(p, reason);
  logger.error("Unhandled Rejection at: Promise ", p, reason);
  // application specific logging, throwing an error, or other logic here
});
