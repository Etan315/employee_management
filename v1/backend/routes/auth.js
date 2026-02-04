const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const verifyToken = require('../middlewares/verifyToken');
const { registerUser, loginUser} = require("../controllers/auth.controller");
const { addEmployee } = require("../controllers/Employee.controller");
const { addPosition } = require("../controllers/addPosition.controller");
const { addDepartment } = require("../controllers/Departments.controller");
const { getEmployeeList } = require("../controllers/getEmployeeList.controller");
const { getEventList, addEvent } = require("../controllers/Event.controller");
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