import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import cors from "cors";
import adminRoutes from "./routes/admin.js";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 
  process.env.MONGO_URI || "mongodb+srv://snowflower701:fCVGSXoU51AlkO6W@cluster0.keeeenm.mongodb.net/";
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
