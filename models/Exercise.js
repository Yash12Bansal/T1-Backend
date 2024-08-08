const mongoose = require('mongoose');
const each_exercise_schema = new mongoose.Schema({
    current_time:{
        type:String
    },
    start_time:{
        type:String
    },
    end_time:{
        type:String
    },
    date:{
        type:Date
    },
    exercise:{
        type:String
    },},{
        timestamps:true
    }
    );
const exercise_schema = new mongoose.Schema({
    email:{
        type:String
    },
    exercise_entries_list:[each_exercise_schema]

});

const ExerciseEntry = mongoose.model('exercise_entry', exercise_schema);
module.exports=ExerciseEntry