import pool from "../db/pool.js";
import { generateId } from "../utils/generateId.util.js";

const newId = generateId();

export const addEvent = async (req, res) => {
  const data = req.body;

  try {
    const event_id = generateId();
    const event_date = `${data.year}-${data.month}-${data.day}`;

    const attachment_url =
      req.files && req.files.length > 0
        ? `/pdf/${req.files[0].filename}`
        : null;

    const query = `
      INSERT INTO events (
        event_id, title, description, city, municipality, participants, 
        event_date,time_start, time_end, attachment_url, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()::timestamp without time zone
      )
    `;

    const values = [
      event_id,
      data.title,
      data.description,
      data.city,
      data.municipality,
      data.participantsId,
      event_date,
      data.timefrom,
      data.timeto,
      attachment_url,
    ];

    await pool.query(query, values);

    res.status(201).json({
      message: "Event added successfully",
      event_id,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event" });
  }
};
