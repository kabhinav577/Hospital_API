const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.send(`<h1>Check Hospital or Covid-19 API Using POSTMAN</h1>`);
});
// Handling all API routes
router.use("/api", require("./api"));

module.exports = router;
