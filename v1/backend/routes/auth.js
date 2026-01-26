const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const verifyToken = require('../middlewares/verifyToken');
const { registerUser, loginUser} = require("../controllers/authController.controller");
const { addEmployee } = require("../controllers/addEmployee.controller");
const { addEvent } = require("../controllers/addEvent.controller");
const { addPosition } = require("../controllers/addPosition.controller");
const { addDepartment } = require("../controllers/addDepartments.controller");
const { getEmployeeList } = require("../controllers/getEmployeeList.controller");
const { getEventList } = require("../controllers/getEventList.controller");
const { countActive } = require("../controllers/countActive.controller");
const { managerController } = require("../controllers/manager.controller");

// const uploadPDF = require("../middlewares/uploadPDF");


router.get("/verify", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/addemployee", addEmployee);
router.post("/addevent", upload.array("attachment"), addEvent);
router.post("/getemployeelist", getEmployeeList);

router.post("/addposition", addPosition);
router.post("/adddepartment", addDepartment); 
router.post("/addmanager", managerController);
router.get("/getEventList", getEventList);

router.get("/counts", countActive);

module.exports = router;