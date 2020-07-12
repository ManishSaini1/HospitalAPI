const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

// Doctor Registration
module.exports.register = async function (req, res) {
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) {
    res.status(400).send({
      message: "Doctor Already Exists !!",
    });
  } else {
    Doctor.create(req.body, function (error, data) {
      if (error) {
        console.log("Error in Regestering the Doctor", error);
        return;
      }
      console.log(data);
      res.status(200).send({
        message: "Doctor Registered SuccesFully !!",
      });
    });
  }
};
// Creating Session for Doctor Login
module.exports.createSession = async function (req, res) {
  let doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor || doctor.password != req.body.password) {
    return res.status(401).send({
      message: "Bad Credentials",
    });
  }
  return res.status(200).send({
    message: "Log in Successfull!! please keep your Token safe",
    data: {
      token: jwt.sign((await doctor).toJSON(), "SecretKEY", {
        expiresIn: "60000000",
      }),
    },
  });
};
