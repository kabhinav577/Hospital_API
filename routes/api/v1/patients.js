const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../../middleware/auth");
const patientController = require("../../../controllers/api/vi/patientsController");

router.post("/register", checkAuth, patientController.registerPatient);

router.post("/:id/create-report", checkAuth, patientController.createReport);

router.get("/:id/all-report", patientController.allReport);

module.exports = router;
