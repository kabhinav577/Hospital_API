const express = require("express");
const router = express.Router();
const doctorController = require("../../../controllers/api/vi/doctorsController");

router.get("/register", doctorController.register);

module.exports = router;
