require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const db = require("./config/mongoose");
const cors = require("cors");

app.use(cors());

///------------- Body Parser for req.body ----------------///
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///--------- USING ROUTES --------------///
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running on Port :: ${port}`);
    return;
  }

  console.log(`Server is Running on Port :: ${port}`);
});
