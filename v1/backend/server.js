// 1. Convert all requires to imports
import express from "express";
import axios from "axios";
import pool from "./db/pool.js"; // Add .js
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"; // Add .js
import authenticateUser from './middlewares/auth.middleware.js';// Add .js
import seedAdmin from "./utils/seedAdmin.js";
import { verifyAdmin } from "./middlewares/verifyAdmin.js"; 
import statsRoutes from "./routes/auth.js"; 
// 2. Initialize dotenv
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: allowOrigin,
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Public routes
app.use("/api", authRoutes);

//counts statictics of employees
app.use("/api/stats", statsRoutes);

app.post("/logout", (req, res) => {
  res.clearCookie("login_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
});

// Run admin seed before the server starts
seedAdmin().then(() => {
  console.log("🔑 Admin seed check completed.");

  // Protected routes
  app.get("/dashboard", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to Dashboard", user: req.user });
  });

  app.get("/usermanagement", authenticateUser, (req, res) => {
    res.json({ message: "User Management Access", user: req.user });
  });

  app.get("/events", authenticateUser, (req, res) => {
    res.json({ message: "events Access", user: req.user });
  });

  app.get("/notification", authenticateUser, (req, res) => {
    res.json({ message: "notification Access", user: req.user });
  });

  app.get("/accesscontrol", authenticateUser, verifyAdmin, (req, res) => {
    res.json({ message: "accesscontrol Access", user: req.user });
  });

  app.get("/support", authenticateUser, (req, res) => {
    res.json({ message: "support Access", user: req.user });
  });

  app.get("/settings", authenticateUser, (req, res) => {
    res.json({ message: "Settings Access", user: req.user });
  });

  app.get("/api/cities", async (req, res) => {
    const { namePrefix } = req.query;

    try {
      const response = await axios.get("https://psgc.gitlab.io/api/cities");
      let cities = response.data;

      if (namePrefix) {
        const query = namePrefix.toLowerCase();
        cities = cities.filter((city) =>
          city.name.toLowerCase().includes(query),
        );
      }

      // Show all if no prefix; otherwise limit to 10
      if (namePrefix) cities = cities.slice(0, 10);

      const formattedData = cities.map((city) => ({
        id: city.code,
        name: city.name,
        province: city.province?.name || "Unknown Province",
        region: city.region?.name || "Unknown Region",
      }));

      res.json(formattedData);
    } catch (err) {
      console.error("Error fetching cities:", err.message);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  app.get("/api/municipalities", async (req, res) => {
    const { namePrefix } = req.query;

    try {
      const response = await axios.get(
        "https://psgc.gitlab.io/api/municipalities",
      );
      let municipalities = response.data;

      if (namePrefix) {
        const query = namePrefix.toLowerCase();
        municipalities = municipalities.filter((mun) =>
          mun.name.toLowerCase().includes(query),
        );
      }

      if (namePrefix) municipalities = municipalities.slice(0, 10);

      const formattedData = municipalities.map((mun) => ({
        id: mun.code,
        name: mun.name,
        province: mun.province?.name || "Unknown Province",
        region: mun.region?.name || "Unknown Region",
      }));

      res.json(formattedData);
    } catch (err) {
      console.error("Error fetching municipalities:", err.message);
      res.status(500).json({ error: "Failed to fetch municipalities" });
    }
  });

  app.get("/api/participants", async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT 
        u.user_id,
        u.username,
        e.first_name,
        e.last_name
      FROM users u
      LEFT JOIN employees e ON u.user_id = e.user_id;
    `);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching participants:", err.message);
      res.status(500).json({ error: "Failed to fetch participants" });
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
