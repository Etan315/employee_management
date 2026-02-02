const pool = require("../db/pool");

const EventList = {
  getAll: async () => {
    const query = `select * from events
        order by event_date asc`;
    const { rows } = await pool.query(query);
    return rows;
  },
};

module.exports = EventList;
