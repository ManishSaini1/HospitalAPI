const Report = require("../models/patient_report");





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
      patient: patient.name,
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

module.exports.reportForSpecificStauts = async function (req, res) {
  var curr = req.params.status;
  console.log(curr);

  let rr = await Report.find({ status: curr });

  const reportArray = [];
  for (let i of rr) {
    const { doctor, patient, date, status } = i;
    const obj = {
      Doctor: doctor,
      Patient: patient,
      Date: date,
      Status: status,
    };
    reportArray.push(obj);
  }
  console.log("PIP");
  console.log("rrr", rr);
  return res.status(200).send({
    message: `Reports with Status : ${curr}`,
    report: reportArray,
  });
};
