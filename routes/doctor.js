const express = require("express");
const router = express.Router();
// Doctor Router
const doctorController = require("../controllers/doctor_controller");

router.post("/register", doctorController.register);
router.post("/login", doctorController.createSession);

module.exports = router;
