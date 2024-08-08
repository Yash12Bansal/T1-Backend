const express=require('express');

const router=express.Router();

var detailsController=require('../controller/details_controller');
router.post('/',detailsController.addDetails);
// router.post('/personal',require('./auth'));
// router.use('/doctor',require('./details'));

module.exports=router; 
