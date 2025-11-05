import mongoose from "mongoose";

const connectDB = async () => {
  // console.log("Loaded MONGO_URI:", process.env.MONGODB_URI);
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
      });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
