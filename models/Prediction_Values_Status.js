const mongoose = require('mongoose');
const each_prediction_schema = new mongoose.Schema({
    amount:{
        type:Number
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    status:{
        type:String
    },},
    {
        timestamps:true
    }
    );
const prediction_value_schema = new mongoose.Schema({
    email:{
        type:String
    },
    prediction_entries_with_status:[each_prediction_schema]

  });

const PredictonValuesStatus = mongoose.model('prediction_entry_with_status', prediction_value_schema);
module.exports= PredictonValuesStatus