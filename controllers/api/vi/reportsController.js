const Report = require("../../../models/report");

module.exports.status = async (req, res) => {
  try {
    if (
      req.params.status != "Negative" &&
      req.params.status != "Travelled-Quarantine" &&
      req.params.status != "Symptoms-Quarantine" &&
      req.params.status != "Positive-Admit"
    ) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Status!",
        Available_Statuses:
          "Negative, Travelled-Quarantine, Symptoms-Quarantine Positive-Admit",
      });
    }

    const reports = await Report.find({ status: req.params.status })
      .populate("patient")
      .populate("doctor");

    // Create an Object :: send back to the user
    let result = {};

    // NO. of Cases that have this Status
    result.caseCount = reports.length;

    let ans = [];
    // Fetching Doctor and Patient Details
    for (let i = 0; i < reports.length; i++) {
      let patient = {};
      patient.name = reports[i].patient.name;
      patient.phone = reports[i].patient.phone;
      ans.push({
        doctor: reports[i].doctor.name,
        patient,
      });
    }

    result.caseCount = ans;

    return res.status(200).json({
      success: true,
      body: result,
      message: "All reports with Status",
    });
  } catch (err) {
    console.log("Error Occoured in Report!", err);
    return res.status(400).json({
      success: false,
      message: "Error Occoured in Report!",
    });
  }
};
