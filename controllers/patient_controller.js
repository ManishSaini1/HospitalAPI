const Patitent = require("../models/patient");
const Doctor = require("../models/doctor");
const Report = require("../models/patient_report");

module.exports.registerPatient = async function (req, res) {
  console.log(req.body);
  let patient = await Patitent.findOne({ phone: req.body.phone });
  if (patient) {
    return res.status(200).send({
      message: "PAtitent Already Exists",
      details: {
        name: patient.name,
        phone: patient.phone,
        report: patient.reports,
      },
    });
  }

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

