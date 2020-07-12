const Patitent = require("../models/patient");

// Patient Registration
module.exports.registerPatient = async function (req, res) {
  let patient = await Patitent.findOne({ phone: req.body.phone });
  // If patient already Exists then returning the details
  if (patient) {
    return res.status(200).send({
      message: "PAtitent Already Exists",
      details: {
        name: patient.name,
        phone: patient.phone,
      },
    });
  }
// Creating new Patient
  Patitent.create(req.body, function (error, patient) {
    if (error) {
      console.log("Error in creating Patitent", error);
      return;
    }
    return res.status(200).send({
      message: "PAtitent Registered Successfully !!",
      details: {
        name: patient.name,
        phone: patient.phone,
        report: patient.reports,
      },
    });
  });
};
