const mongoose = require('mongoose');
const each_food_entry_schema = new mongoose.Schema({
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
const food_entries_schema = new mongoose.Schema({
    email:{
        type:String
    },
    food_entries_list:[each_food_entry_schema]

  });

const FoodEntry = mongoose.model('food_entry', food_entries_schema);
module.exports= FoodEntry