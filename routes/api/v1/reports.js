const express = require("express");
const router = express.Router();
const reportController = require("../../../controllers/api/vi/reportsController");

router.get("/:status", reportController.status);

module.exports = router;
