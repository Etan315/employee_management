// services/getCount.js
const pool = require("../db/pool");

async function getCount() {
  const [employees, departments, active] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM employees"),
    pool.query("SELECT COUNT(*) FROM departments"),
    pool.query("SELECT COUNT(*) FROM employees WHERE employment_status = 'Active'"),
  ]);

  return {
    employees: parseInt(employees.rows[0].count),
    departments: parseInt(departments.rows[0].count),
    activeEmployees: parseInt(active.rows[0].count),
  };
}

module.exports = { getCount };