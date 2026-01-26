const ManagerModel = require("../models/ManagerInfo.model");
const crypto = require("crypto")

exports.managerController = async (req, res) => {
  const manager_id = crypto.randomInt(1000000000, 9999999999);
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
