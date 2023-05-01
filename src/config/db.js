const mongoose = require("mongoose");

// Set mongoose to stricquery to know whether mongoose should enforce a stric schema or not
mongoose.set("strictQuery", false);

// connect to Database
exports.connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log(
        `Database Connected: ${process.env.PORT}`.cyan.underline.bold
      );
    })
    .catch((err) => {
      console.log(err);
    }); 
};

// Disconnect DB
exports.disconnectDB = async () => {
  return await mongoose.disconnect();
};

// // Export the database connection
// export default {
//   connectDB,
//   disconnectDB,
// };
