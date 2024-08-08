const mongoose = require('mongoose');
const each_bg_schema = new mongoose.Schema({
    blood_glucose_type:{
        type:String
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    value:{
        type:String
    },},
    {
        timestamps:true
    }
    );
const bg_schema = new mongoose.Schema({
    email:{
        type:String
    },
    bg_entries_list:[each_bg_schema]

});


const BloodGlucose = mongoose.model('blood_glucose_entry', bg_schema);
module.exports=BloodGlucose