import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import cors from "cors";
import adminRoutes from "./routes/admin.js";
import bcrypt from "bcryptjs";
import nodeCron from "node-cron";
import { sendIncompleteUsersReminder } from "./controllers/adminController.js";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 
  process.env.MONGO_URI ;
app.use(cors());
// Middleware
app.use(express.json());

// Connecting to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.use("/users", userRoutes);

app.use("/admin", adminRoutes);
//? Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

nodeCron.schedule("0 0 */3 * *", async () => {
  await sendIncompleteUsersReminder({}, { status: () => {}, json: () => {} });
});

const passtoJWT=async()=>{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("1234", salt);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
