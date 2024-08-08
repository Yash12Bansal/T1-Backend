const mongoose=require('mongoose');
const each_patient = new mongoose.Schema({
    email:{
        type:String,
    }
});
const expertsSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type:String,
    },
    web_usage_access:{
        type: Boolean,
        default: false,
    },
    clinic_address:{
        type:String
    },
    dob:{
        type:Date
    },
    phone:{
        type:String
    },
    medical_reg_no:{
        type:String
    },
    degree:{
        type:String
    },
    patients:[each_patient]
});
const Expert = mongoose.model('signed_up_experts',expertsSchema);
module.exports=Expert;