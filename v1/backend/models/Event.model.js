import pool from "../db/pool.js";

const Event = {
  getAll: async () => {
    const query = `select * from events
        order by event_date asc`;
    const { rows } = await pool.query(query);
    return rows;
  },
  insertEvent: async (eventData) => {
    const query = `
      INSERT INTO events (
        event_id, title, description, city, municipality, participants, 
        event_date, time_start, time_end, attachment_url, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()::timestamp without time zone
      ) Returning *;
    `;
    const values = [
      eventData.event_id,
      eventData.title,
      eventData.description,
      eventData.city,
      eventData.municipality,
      eventData.participants,
      eventData.event_date,
      eventData.time_start,
      eventData.time_end,
      eventData.attachment_url,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

export default Event;
