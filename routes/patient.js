const express = require("express");
const passport = require("passport");
const router = express.Router();
const patientController = require("../controllers/patient_controller");
const reportController = require("../controllers/reports_controller");
// Patient Router
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.registerPatient
);
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: true }),
  reportController.createReport
);
router.get("/:id/all_reports", reportController.createReport);

module.exports = router;
