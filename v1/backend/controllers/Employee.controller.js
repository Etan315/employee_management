const bcrypt = require("bcrypt");
const { generateId } = require("../utils/generateId.util.js");
const Employee = require("../models/Employee.model.js");
const pool = require("../db/pool.js");

exports.addEmployee = async (req, res) => {
  const data = req.body;
  let client;

  try {
    client = await pool.connect(); //
    await client.query("BEGIN");

    const user_id = generateId();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await Employee.create_user(client, {
      user_id,
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    const employeeId = generateId();
    const date_of_birth = `${data.year}-${data.month}-${data.day}`;
    const joined_date = `${data.joined_year}-${data.joined_month}-${data.joined_day}`;

    const empResult = await Employee.insert_employee(client, {
      emp_id: employeeId,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      date_of_birth,
      gender: data.gender,
      phone_number: data.phone_number,
      department_id: data.department_id,
      position_id: data.position_id,
      manager_id: data.manager_id || null,
      joined_date,
      employment_status: data.employment_status,
      user_id: user_id,
      municipality: data.municipality,
      city: data.city,
      is_active: false,
    });

    await client.query("COMMIT");

    res.status(201).json({
      message: "Employee and user added successfully",
      employee: empResult.rows[0],
    });
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    console.error("Transaction failed:", error);
    res.status(500).json({ error: "Server error, transaction failed" });
  } finally {
    if (client) client.release();
  }
};
