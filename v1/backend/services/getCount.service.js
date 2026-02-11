// services/getCount.service.js
import pool from "../db/pool.js";

export async function getCount() {
  const [employees, departments, active] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM employees"),
    pool.query("SELECT COUNT(*) FROM departments"),
    pool.query("SELECT COUNT(*) FROM attendance WHERE is_active = true"),
  ]);

  return {
    employees: parseInt(employees.rows[0].count),
    departments: parseInt(departments.rows[0].count),
    activeEmployees: parseInt(active.rows[0].count),
  };
}
