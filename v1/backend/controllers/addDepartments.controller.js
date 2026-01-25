const pool = require("../db/pool");
const crypto = require("crypto");

exports.addDepartment = async (req, res) => {
  const data = req.body;
  const department_id = crypto.randomInt(1_000_000_000, 9_999_999_999).toString();

  try {
    const query = `INSERT INTO departments (department_id, department_name) values ($1, $2)`;
    const values = [department_id, data.department];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Event added successfully",
      department_id: department_id,
    });
    console.log("Event added successfully", result.rows[0]);
  } catch (error) {
    console.error("Error adding deparment:", error);
    res.status(500).json({ error: "Failed to add department" });
  }
};
