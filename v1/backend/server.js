const express = require("express");
const axios = require("axios");
const pool = require("./db/pool");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./middlewares/authMiddleware");
const seedAdmin = require("./utils/seedAdmin");

const { verifyAdmin } = require("./middlewares/verifyAdmin.js");
const statsRoutes = require("./routes/auth.js");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Run admin seed before the server starts
seedAdmin().then(() => {
  console.log("🔑 Admin seed check completed.");

  // Public routes
  app.use("/api", authRoutes);

  // Protected routes
  app.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to Dashboard", user: req.user });
  });

  app.get("/usermanagement", verifyToken, (req, res) => {
    res.json({ message: "User Management Access", user: req.user });
  });

  app.get("/events", verifyToken, (req, res) => {
    res.json({ message: "events Access", user: req.user });
  });

  app.get("/notification", verifyToken, (req, res) => {
    res.json({ message: "notification Access", user: req.user });
  });

  app.get("/accesscontrol", verifyToken, verifyAdmin, (req, res) => {
    res.json({ message: "accesscontrol Access", user: req.user });
  });

  app.get("/support", verifyToken, (req, res) => {
    res.json({ message: "support Access", user: req.user });
  });

  app.get("/settings", verifyToken, (req, res) => {
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
          city.name.toLowerCase().includes(query)
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
        "https://psgc.gitlab.io/api/municipalities"
      );
      let municipalities = response.data;

      if (namePrefix) {
        const query = namePrefix.toLowerCase();
        municipalities = municipalities.filter((mun) =>
          mun.name.toLowerCase().includes(query)
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

  //counts statictics of employees
  app.use("/api/stats", statsRoutes);

  app.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out successfully" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
