const mongoose = require("mongoose");
const exercises_list_schema = new mongoose.Schema({
  A: {
    type: String,
  },
  B: {
    type: Number,
  },
});

const Exercises = mongoose.model("Exercise", exercises_list_schema);
module.exports = Exercises;
