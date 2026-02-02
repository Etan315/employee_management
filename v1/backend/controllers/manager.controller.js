import ManagerModel from "../models/ManagerInfo.model.js";
import { generateId } from "../utils/generateId.util.js";  

export const managerController = async (req, res) => {
  const manager_id = generateId();
  const { user_id, position_id } = req.body;
  try {
    const manager = await ManagerModel.addManager(
      manager_id,
      user_id,
      position_id,
    );
    res.status(200).json({
      success: true,
      message: "Successfully added manager user",
      data: manager[0]
    });
  } catch (error) {
    console.error("Controller error in adding new manager: ", error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    })
  }
};
