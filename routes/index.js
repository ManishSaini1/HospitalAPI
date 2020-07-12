const express=require('express');
const router=express.Router();

const reportController=require('../controllers/reports_controller')

router.use('/doctor',require('./doctor'));
router.use('/patients', require('./patient'));
router.use('/reports/', require('./reports'));
module.exports=router;