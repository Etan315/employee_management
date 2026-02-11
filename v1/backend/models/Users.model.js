import pool from "../db/pool.js";

const User = {
  findByEmail: async (email) => {
    const query = `Select * from users where email = $1`;
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  create: async (userData) => {
    const { user_id, username, email, password } = userData;
    const query = `INSERT INTO users (user_id, username, email, password, create_at) values ($1, $2, $3, $4, NOW():: timestamp without time zone) 
    RETURNING user_id, username, email`;
    const values = [user_id, username, email, password];
    const { rows } = await pool.query( query, values);
    return rows[0];
  },
};

export default User;
