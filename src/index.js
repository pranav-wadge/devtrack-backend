import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import registerMetrics from "./metrics.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devtrack";

// Mongo connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.send("DevTrack API is running"));
app.use("/api/projects", projectRoutes);

// Metrics endpoint
registerMetrics(app);

// Start server
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
