const mongoose = require('mongoose');
const new_request_schema = new mongoose.Schema({
    food_name:{
        type:String
    },
    email:{
        type:String
    }
});

const NewFoodRequests = mongoose.model('new_food_requests', new_request_schema);
module.exports=NewFoodRequests