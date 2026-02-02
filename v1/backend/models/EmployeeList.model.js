const pool = require("../db/pool");

const EmployeeList = {
  getAll: async () => {
    const query = `SELECT 
      *
      FROM users u
      LEFT JOIN employees e 
      ON u.user_id = e.user_id;`;
      const { result } = await pool.query(query);
      return result;
  },
};

module.exports = EmployeeList;
