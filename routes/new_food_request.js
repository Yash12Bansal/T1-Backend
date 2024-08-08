const express=require('express');

const router=express.Router();

const newFoodController=require('../controller/new_food_request');

router.post('/',newFoodController.sendRequest);

module.exports=router; 
