const pool = require("../db/pool.js");

const Position = {
    addPosition: async (PositionData) => {
        // TODO: add department id here later
        const query = `INSERT INTO positions (position_id, position_name) VALUES ($1, $2) returning *`;
        const values = [PositionData.position_id, PositionData.position_name];

        const result = await pool.query (query, values);
        return result.rows[0];
    }
};

module.exports = Position;