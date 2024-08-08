const mongoose = require('mongoose');
const each_prediction_extra_detail_schema = new mongoose.Schema({
    current_bg:{
        type:Number
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    food_category:{
        type:String
    },
    food_name:{
        type:String
    },
    food_quantity:{
        type:Number
    },

},
    {
        timestamps:true
    }
    );
const prediction_extra_detail_schema = new mongoose.Schema({
    email:{
        type:String
    },
    extra_detail_entries:[each_prediction_extra_detail_schema]

  });

const PredictonExtraDetails = mongoose.model('prediction_extra_detail_entry', prediction_extra_detail_schema);
module.exports= PredictonExtraDetails