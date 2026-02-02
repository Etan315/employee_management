import EmployeeList from "../models/EmployeeList.model.js";

exports.getEmployeeList = async (req, res) => {
  try {
    const EmployeeLists =  await EmployeeList.getAll();

    res.status(200).json(EmployeeLists);
  } catch (error) {
    console.error("Error getting employee list:", error);
    res.status(500).json({ error: "Failed to fetch manager list" });
  }
};
