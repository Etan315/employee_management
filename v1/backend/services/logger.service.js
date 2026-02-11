const pool = require("../db/pool.js");
const { generateId } = require("../utils/generateId.util.js");

const Logger = {
  log: async (user_id, action, details, target_role) => {
    const log_id = generateId();
    try {
      const query = `INSERT INTO logs (log_id, user_id, action_type, details, target_role) VALUES ($1, $2, $3, $4, $5)`;
      const values = [log_id, user_id, action, details, target_role];
      await pool.query(query, values);
    } catch (error) {
      console.error("Critical: Logging Service Error ->", error);
    }
  },
};

module.exports = Logger;
