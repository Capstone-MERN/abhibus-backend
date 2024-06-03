const mongoose = require("mongoose");

const connectDataBaseServer = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("connected to mongoDB", process.env.DB_HOST);
  } catch (error) {
    console.error("Connection to mongoDB failed", error.message);
  }
};

module.exports = connectDataBaseServer;
