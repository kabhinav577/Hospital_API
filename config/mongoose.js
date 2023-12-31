const mongoose = require("mongoose");
const port = process.env.MONGO_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(port, connectionParams)
  .then(() => {
    console.log("Connected to the DB Successfully ");
  })
  .catch((err) => {
    console.error(`Error connecting to the DB. ${err}`);
  });
