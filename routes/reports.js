const express = require("express");
const router = express.Router();

// Report Router
const reportController = require("../controllers/reports_controller");

router.get("/:status", reportController.reportForSpecificStauts);

module.exports = router;
