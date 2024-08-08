const express=require('express');

const router=express.Router();

const bgController=require('../controller/blood_glucose_controller');

router.post('/',bgController.addBloodGlucose)


module.exports=router; 
