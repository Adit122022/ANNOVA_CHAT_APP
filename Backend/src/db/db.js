import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("🐰🐼🐼MongoDB Connected...✅✅✅ ... 🐼🐼🐰"))
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      process.exit(1); // don't run the server without a database
    });
};

export default connect;