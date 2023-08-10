const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");

exports.checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("token not Available!");
    return res.status(401).json({
      success: false,
      message: "Unathorized Access",
    });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    // console.log(decoded);
    req.doctor = await Doctor.findById(decoded.id);
    next();
  } catch (err) {
    console.log("Error in Authentication!", err);
    return res.status(401).json({
      success: false,
      message: "Unathorized Access",
    });
  }
};
