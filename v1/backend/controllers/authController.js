const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { findUserByEmail } = require("../services/userService");

// REGISTER
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    // Check if user exists
    const existingUser = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length)
      return res.status(400).json({ error: "Email already registered" });

    const userId = crypto.randomInt(1000000000, 9999999999);

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (user_id, username, email, password, created_at)
       VALUES ($1, $2, $3, $4, NOW()::timestamp without time zone)`,
      [userId, username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully", user_id: userId });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // ✅ Store token in HTTP-only cookie
    res.cookie("login_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      user: { user_id: user.user_id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Server error" });
  }
};

