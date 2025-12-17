
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017");
    // await mongoose.connect("mongodb+srv://vlajusha_db_user:ajusha@123@cluster0.n9xrjy5.mongodb.net/?appName=Cluster0");

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
