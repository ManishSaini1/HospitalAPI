const Report = require("../models/patient_report");
const Doctor = require("../models/doctor");
const Report = require("../models/patient_report");

// Creating Report for Patient
module.exports.createReport = async function (req, res) {
  const userPhone = req.params.id;
  //Getting details of the logged in user from the Session 
  const { passport } = req.session;
  const doctorEmail = passport.user.email;
  const doctor = await Doctor.findOne({ email: doctorEmail });
  //Finding the patient whom report to be create
  const patient = await Patitent.findOne({ phone: userPhone });
  //Getting the Current Date for Repor
  let currentDate = new Date();
  currentDate = currentDate.toJSON().slice(0, 10);
  Report.create(
    {
      doctor: doctor.name,
      patient: patient.name,
      status: req.body.status,
      date: currentDate,
    },
    function (error, report) {
      if (error) {
        console.log("Error in Creating Report", error);
        return;
      }
      patient.reports.push(report);
      patient.save();
    }
  );

  return res.status(200).send({
    message: "Report Generated Success Fully!!",
  });
};
//Generting all report for the requested User
module.exports.allReports = async function (req, res) {
  const patientPhone = req.params.id;
  //Finding the patient with Requested Id
  const patient = await Patitent.findOne({ phone: patientPhone });

  if (!patient) {
    return res.status(404).send({
      message: "Patient Not Found ",
    });
  }
  //Creating Report array for the Requested User
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
// Generating all Reports for requested status
module.exports.reportForSpecificStauts = async function (req, res) {
  var requestedStatus = req.params.status;

//Finding all the Reports with Requested status
  let reportsWithRequestedStatus = await Report.find({ status: requestedStatus });

  const reportArray = [];
  for (let i of reportsWithRequestedStatus ) {
    const { doctor, patient, date, status } = i;
    const reportObject = {
      Doctor: doctor,
      Patient: patient,
      Date: date,
      Status: status,
    };
    reportArray.push(reportObject);
  }
  return res.status(200).send({
    message: `Reports with Status : ${requestedStatus}`,
    report: reportArray,
  });
};
