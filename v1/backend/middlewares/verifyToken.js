// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const pool = require("./../db/pool");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.login_token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
        
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB including role
    const result = await pool.query(
      "SELECT user_id, email, username, role FROM users WHERE user_id = $1",
      [decoded.user_id]
    );

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Attach user (including role) to request
    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
