const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  // details:{
  name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  sex: {
    type: String,
  },
  year_of_diabetes_diagnosis: {
    type: Date,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  total_doses: {
    type: Number,
  },
  phone: {
    type: String,
  },
  doctor_name: {
    type: String,
  },
  user_app_usage_eligiblity: {
    type: Boolean,
    default: false,
  },
  user_insulin_prediction_allowed: {
    type: Boolean,
    default: false,
  },

  // }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
