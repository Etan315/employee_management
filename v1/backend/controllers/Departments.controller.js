const crypto = require("crypto");
const { generateId } = require("../utils/generateId.util.js");
const Department = require("..//models/Department.model.js")

exports.addDepartment = async (req, res) => {
  const data = req.body;
  const department_id = generateId();

  try {
    const result = await Department.create({department_id, department_name: data.department});

    res.status(201).json({
      message: "Event added successfully",
      department_id: department_id,
      data: result
    });

  } catch (error) {
    console.error("Error adding deparment:", error);
    res.status(500).json({ error: "Failed to add department" });
  }
};
