const pool = require("../db/pool");
const crypto = require("crypto");

exports.addPosition = async (req, res) => { 
  const data = req.body;
  const position_id = crypto.randomInt(1_000_000_000, 9_999_999_999).toString();

  try {
    const query = `INSERT INTO positions (position_id, position_name) VALUES ($1, $2)`;
    const values = [position_id, data.position];

    await pool.query(query, values);

    res.status(201).json({
      message: "Position added successfully",
      position_id: position_id,
    });

    console.log("Position added successfully", position_id);
  } catch (error) {
    console.error("Error adding position:", error);
    res.status(500).json({ error: "Failed to add position" });
  }
};
