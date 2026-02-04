const pool = require("../db/pool.js");
const { generateId }= require("../utils/generateId.util.js");
const Position = require("../models/Position.model.js")

export const addPosition = async (req, res) => { 
  const data = req.body;
  const position_id = generateId();

  try {
    await Position.addPosition({
      position_id: position_id,
      position_name: data.position_name
    });

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
