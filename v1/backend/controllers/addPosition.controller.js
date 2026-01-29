import pool from "../db/pool.js";
import { generateId } from "../utils/generateId.util.js";

export const addPosition = async (req, res) => { 
  const data = req.body;
  const position_id = generateId();

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
