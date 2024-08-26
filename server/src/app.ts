import express from "express";
import connectDB from "./config/db"; // Corrected the import path
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);

export default app;
