const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const verifyToken = require('../middlewares/verifyToken');
const { registerUser, loginUser} = require("../controllers/authController");
const { addEmployee } = require("../controllers/addEmployee");
const { addEvent } = require("../controllers/addEvent");
const { addPosition } = require("../controllers/addPosition");
const { addDepartment } = require("../controllers/addDepartment");
const { getEmployeeList } = require("../controllers/getEmployeeList");
const { getEventList } = require("../controllers/getEventList");
const { countActive } = require("../controllers/countActive");

const uploadPDF = require("../middlewares/uploadPDF");


router.get("/verify", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/addemployee", addEmployee);
router.post("/addevent", upload.array("attachments"), addEvent);
router.post("/getemployeelist", getEmployeeList);

router.post("/addposition", addPosition);
router.post("/adddepartment", addDepartment); 
router.get("/api/getEventList", getEventList);

router.get("/counts", countActive);

module.exports = router;