const mongoose = require('mongoose');
const new_request_schema = new mongoose.Schema({
    exercise_name:{
        type:String
    },
    email:{
        type:String
    }
});

const NewExerciseRequests = mongoose.model('new_exercise_requests', new_request_schema);
module.exports=NewExerciseRequests