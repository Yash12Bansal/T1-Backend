const mongoose=require('mongoose');
const new_patients_requests_schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String
    }
});

const NewPatientRequest=mongoose.model("new_patients_requests",new_patients_requests_schema);
module.exports = NewPatientRequest;
