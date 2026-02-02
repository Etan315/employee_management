const pool = require("../db/pool");;

const Department = {
    create: async ({department_id, department_name}) => {
        const query =`INSERT INTO departments (department_id, department_name) values ($1, $2)`;
        const values = [department_id, department_name];;
        const { rows } =  await pool.query(query, values);
        return rows[0];
    }
};

module.exports = Department;