const express=require('express');

const router=express.Router();

const authController=require('../controller/auth_controller');

router.post('/',authController.authenticate);
router.use("/web", require("./web_auth"));
module.exports=router; 
