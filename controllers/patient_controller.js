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

module.exports.createReport = async function (req, res) {
  const userPhone = req.params.id;
  console.log(req.body);
  const { passport } = req.session;
  const doctorEmail = passport.user.email;
  const doctor = await Doctor.findOne({ email: doctorEmail });
  const patient = await Patitent.findOne({ phone: userPhone });
  let currentDate = new Date();
  currentDate = currentDate.toJSON().slice(0, 10);
  Report.create(
    {
      doctor: doctor.name,
      patient: patient._id,
      status: req.body.status,
      date: currentDate,
    },
    function (error, report) {
      console.log("Report is ", report);
      if (error) {
        console.log("Error in Creating Report", error);
        return;
      }
      console.log("All reports of patient", patient.reports);
      patient.reports.push(report);
      patient.save();
    }
  );

  return res.status(200).send({
    message: "Report Generated Success Fully!!",
  });
};


module.exports.allReports = async function (req, res) {
  const patientPhone = req.params.id;
  console.log(" I am here in all reports", patientPhone);
  const patient = await Patitent.findOne({ phone: patientPhone });

  if (!patient) {
    return res.status(404).send({
      message: "Patient Not Found ",
    });
  }
  let reports = [];
  for (let i of patient.reports) {
    let currentReport = await Report.find({ _id: i });
    if (currentReport != null) {
      let obj = {
        Doctor: currentReport[0].doctor,
        Status: currentReport[0].status,
        Date: currentReport[0].date,
      };
      reports.push(obj);
    }
  }

  return res.status(200).send({
    message: " Report of Patient",
    data: {
      report: reports,
    },
  });
};


