// utils/seedAdmin.js
import bcrypt from "bcryptjs";
import pkg from "pg";
const { Pool } = pkg;
import { generateId } from "./generateId.util.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function seedAdmin() {
  const username = "admin";
  const email = "admin@gmail.com";
  const password = "admin";

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      console.log("✅ Default admin user already exists.");
      return;
    }

    // Generate a 10-digit ID as seen in your other controllers
    const userId = generateId(); 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add user_id to the INSERT query
    await pool.query(
      `INSERT INTO users (user_id, username, email, password, role, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [userId, username, email, hashedPassword, "admin", ]
    );

    console.log("🎉 Default admin user created successfully with ID:", userId);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
  }
}

export default seedAdmin;