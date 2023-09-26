const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("database connected");
    });
    mongoose.connection.on("error", () => {
      console.log("failed to connect database");
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
