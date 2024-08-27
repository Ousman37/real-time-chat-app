// server/app.ts
import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Enable CORS for requests from specific origins (e.g., your React app)
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your React app
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials if needed
  })
);

// Connect to Database
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1); // Exit the process if the database connection fails
});

// Init Middleware
app.use(express.json()); // Parse JSON payloads

// Define Routes
app.use("/api/auth", authRoutes); // Auth routes for handling user authentication

// Handle basic route to test server
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle global errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

export default app; // Export the configured Express app
