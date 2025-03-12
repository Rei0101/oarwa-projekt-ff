import CONFIG from "./config.js";
import mongoose from "mongoose";

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(CONFIG.DB_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  if (isConnected) {
    await mongoose.connection
      .close()
      .then(console.log("MongoDB connection closed"));
    isConnected = false;
  }
};

export { connectDB, closeDB };
