import pool from "../db/pool.js";

const addManager = {
  addManager: async (manager_id, user_id, position_id) => {
    const query = `INSERT into managers (manager_id, user_id, position_id)
        VALUES ($1, $2, $3) 
        RETURNING *`;
    const values = [manager_id, user_id, position_id];
    const { rows } = await pool.query(query, values);

    return rows;
  },
};

export default addManager;
