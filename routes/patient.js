const express=require('express');
const passport = require('passport');
const router= express.Router();
const patientController= require('../controllers/patient_controller');




router.post('/register',passport.authenticate('jwt',{session: false}),patientController.registerPatient);
router.post('/:id/create_report',passport.authenticate('jwt', {session: true}), patientController.createReport);
router.get('/:id/all_reports', patientController.allReports);




module.exports=router;