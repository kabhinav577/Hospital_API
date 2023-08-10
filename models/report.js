const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Patient",
  },
  status: {
    type: "String",
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
