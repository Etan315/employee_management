const pool = require("../db/pool");

exports.getEmployeeList = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
      *
      FROM users u
      LEFT JOIN employees e 
      ON u.user_id = e.user_id;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting employee list:", error);
    res.status(500).json({ error: "Failed to fetch manager list" });
  }
};
