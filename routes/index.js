const express = require("express");
const router = express.Router();

// Handling all routes
router.use("/api", require("./api"));

module.exports = router;
