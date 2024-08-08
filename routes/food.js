const express=require('express');

const router=express.Router();

const foodController=require('../controller/food_controller');

router.get('/',foodController.getFood)
router.post('/entry',foodController.addFood);

module.exports=router; 
