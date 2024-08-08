const mongoose = require("mongoose");
const food_collection_schema = new mongoose.Schema({
  name: {
    type: String,
  },
  calories: {
    type: Number,
  },
  carbs: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  serving_size: {
    type: String,
  },
});

const Food = mongoose.model("foods_collection", food_collection_schema);
module.exports = Food;
