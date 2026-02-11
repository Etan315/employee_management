import Department from"../models/Department.model.js";
import { generateId } from"../utils/generateId.util.js";
import Logger from"../services/logger.service.js";

export const addDepartment = async (req, res) => {
  const data = req.body;
  const department_id = generateId();

  try {
    const result = await Department.create({
      department_id,
      department_name: data.department,
    });

    // this will get the user_id from the verified token, which is set in the auth middleware
    const performerId = req.user?.user_id;

    Logger.log(
      performerId, 
      'CREATE_DEPARTMENT', 
      `Created department: ${data.department}`, 
      'manager'
    );

    res.status(201).json({
      message: "Department added successfully",
      department_id: department_id,
      data: result,
    });

  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ error: "Failed to add department" });
  }
};