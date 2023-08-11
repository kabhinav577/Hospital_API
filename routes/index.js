const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h1>Testing Hospital or Covid-19 API Use POSTMAN</h1>`);
});
// Handling all API routes
router.use("/api", require("./api"));

module.exports = router;
