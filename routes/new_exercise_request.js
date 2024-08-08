const express=require('express');

const router=express.Router();

const newExerciseController=require('../controller/new_exercise_request_controller');

router.post('/',newExerciseController.sendRequest);

module.exports=router; 
