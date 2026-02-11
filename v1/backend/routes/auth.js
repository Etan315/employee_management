import express from "express";
import multer from "multer";

import authenticateUser from "../middlewares/auth.middleware.js";

import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { addEmployee } from "../controllers/Employee.controller.js";
import { addPosition } from "../controllers/addPosition.controller.js";
import { addDepartment } from "../controllers/Departments.controller.js";
import { getEmployeeList } from "../controllers/getEmployeeList.controller.js";
import { getEventList, addEvent } from "../controllers/Event.controller.js";
import { countActive } from "../controllers/countActive.controller.js";
import { managerController } from "../controllers/manager.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// PUBLIC ROUTES (Usually Login/Register aren't behind verifyToken)
router.post("/register", registerUser);
router.post("/login", loginUser);

// VERIFY TOKEN MIDDLEWARE (Everything below this line requires a token)
router.use(authenticateUser);

router.get("/verify", (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post("/addemployee", addEmployee);
router.post("/addevent", upload.array("attachment"), addEvent);
router.post("/getemployeelist", getEmployeeList);

router.post("/addposition", addPosition);
router.post("/adddepartment", addDepartment);
router.post("/addmanager", managerController);
router.get("/getEventList", getEventList);

router.get("/counts", countActive);

export default router;
