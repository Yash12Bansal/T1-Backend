const mongoose = require('mongoose');
const each_insulin_schema = new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    correction_dose:{
        type:Number
    },
    time:{
        type:String
    },
    date:{
        type:Date
    },
    type:{
        type:String
    },},
    {
        timestamps:true
    }
    );
const insulin_schema = new mongoose.Schema({
    email:{
        type:String
    },
    insulin_entries_list:[each_insulin_schema]

  });

const Insulin = mongoose.model('insulin_entry', insulin_schema);
module.exports=Insulin