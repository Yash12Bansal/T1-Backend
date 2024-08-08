const express=require('express');

const router=express.Router();

const exerciseController=require('../controller/exercises_controller');

router.get('/',exerciseController.getExercises);


module.exports=router; 
