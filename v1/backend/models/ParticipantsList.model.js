import pool from "../db/pool.js";

const PartcipantsList = {
  getList: async () => {
    const query = `SELECT 
        u.user_id,
        u.username,
        e.first_name,
        e.last_name
      FROM users u
      LEFT JOIN employees e ON u.user_id = e.user_id;`;
    const { rows } = await pool.query(query);
    return rows;
  },
};

export default PartcipantsList;
