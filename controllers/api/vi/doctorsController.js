const Doctor = require("../../../models/doctor");

module.exports.register = async (req, res) => {
  try {
    let doctor = await Doctor.create(req.body);

    return res.status(200).json({
      success: true,
      body: doctor,
      message: "Doctor Registeration Successful",
    });
  } catch (err) {
    console.log("Error in register Doctor details", err);
    return res.status(400).json({
      success: false,
      message: "Error Occured in Registering Doctor details",
    });
  }
};

// Doctor login Controller
module.exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter email or Password!",
      });
    }

    let doctor = await Doctor.findOne({ email: email });

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or Password!",
      });
    }

    // Checking Password of username
    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or Password!",
      });
    }

    const token = doctor.getSignedJwtToken();

    return res.status(200).json({
      success: true,
      token,
      message: `Log In Sucessful! Keep the Token safe ${doctor.name}!`,
    });
  } catch (err) {
    console.log("Error in login Doctor account", err);
    return res.status(400).json({
      success: false,
      message: "Error Occured in logging doctor account",
    });
  }
};
