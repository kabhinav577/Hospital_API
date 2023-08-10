const Patient = require("../../../models/patient");
const Report = require("../../../models/report");

// Register patient
module.exports.registerPatient = async (req, res) => {
  try {
    const { name, phone } = req.body;

    let patient;
    patient = await Patient.findOne({ phone });

    if (patient) {
      return res.status(200).json({
        success: true,
        body: patient,
      });
    }

    patient = await Patient.create({
      name,
      phone,
    });

    return res.status(200).json({
      success: true,
      body: patient,
      message: "Patient Registered Successfully!",
    });
  } catch (err) {
    console.log("Error occured in register Patient", err);
    return res.status(401).json({
      success: false,
      message: "Error Occoured in register Patient!",
    });
  }
};

// Create patient Report
module.exports.createReport = async (req, res) => {
  try {
    const { status } = req.body;
    const patientId = req.params.id;
    const doctorID = req.doctor.id;
    // here my code is break
    const patientDetails = await Patient.findById(patientId);

    const report = await Report.create({
      doctor: doctorID,
      patient: patientId,
      status: status,
    });

    patientDetails.reports.push(report);
    await patientDetails.save();

    return res.status(200).json({
      success: true,
      body: report,
      message: "Report Created Successfully!",
    });
  } catch (err) {
    console.log("Error occured in create Patient Report", err);
    return res.status(400).json({
      success: false,
      message: "Error Occoured in create Patient Report!",
    });
  }
};

module.exports.allReport = async (req, res) => {
  try {
    const reports = await Patient.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctor" },
    });

    // Create an Object :: push the all reports into array and send back to user
    let result = {};
    result.patientName = reports.name;
    result.phone = reports.phone;
    result.reports = [];
    for (let i = 0; i < reports.reports.length; i++) {
      result.reports.push({
        doctor: reports.reports[i].doctor.name,
        status: reports.reports[i].status,
      });
    }

    return res.status(200).json({
      success: true,
      body: result,
      message: "All reports of the Patient",
    });
  } catch (err) {
    console.log("error in showing all reports", err);
    return res.status(400).json({
      success: false,
      message: "Error in showing all reports",
    });
  }
};
