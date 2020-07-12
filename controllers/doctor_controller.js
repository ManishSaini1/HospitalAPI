const Doctor = require("../models/doctor");
const jwt=require('jsonwebtoken');
const express=require('express');
const app=express();
const { ExtractJwt } = require("passport-jwt");

module.exports.register = async function (req, res) {
  const doctor =await Doctor.findOne({ email: req.body.email });
  if (doctor) {
    res.status(400).send({
      message: "Doctor Already Exists !!",
    });
  }
else
{
  Doctor.create(req.body, function (error, data) {
    if (error) {console.log("Error in Regestering the Doctor", error);  return; }
    console.log(data);
    res.status(200).send({
      message: "Doctor Registered SuccesFully !!",
    });
  });
}
};


module.exports.createSession = async function (req, res) {
        
  let doctor =await Doctor.findOne({ email: req.body.email });
  console.log(" I AM here in docot controller", doctor);
  if (!doctor || doctor.password != req.body.password) {
    return res.status(401).send({
      message: "Bad Credentials",
    });
  }
  // app.locals.loggedIn=doctor;
  //  console.log("i am looged", loggedIn);

    
    return res.status(200).send(
        {
            message : "Log in Successfull!! please keep your Token safe",
            data:
        {
            token: jwt.sign((await doctor).toJSON(), "SecretKEY", {expiresIn: "60000000"})
        }
        });


};
