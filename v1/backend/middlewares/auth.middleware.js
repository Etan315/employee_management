// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import pool from "./../db/pool.js";

const authenticateUser = async (req, res, next) => {
  try {
    // Check cookies first, then check Authorization header
    const token = 
      req.cookies?.login_token || 
      (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied, no token provided" });
    }
        
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB to ensure they still exist and have the correct role
    const result = await pool.query(
      "SELECT user_id, email, username, role FROM users WHERE user_id = $1",
      [decoded.user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach fresh user data to the request object
    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authenticateUser;