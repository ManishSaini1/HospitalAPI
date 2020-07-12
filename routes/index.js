const express = require("express");
const router = express.Router();
// Main Router
router.use("/doctor", require("./doctor"));
router.use("/patients", require("./patient"));
router.use("/reports/", require("./reports"));
module.exports = router;
