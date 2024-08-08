const express=require('express');

const router=express.Router();

const insulinController=require('../controller/insulin_controller');

router.post('/',insulinController.addInsulin);


module.exports=router; 
