const mongoose=require('mongoose');
const approvedExpertsSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    // details:{
    name:{
        type: String,
    },
    // }
});
const ApprovedExpert = mongoose.model('approved_experts',approvedExpertsSchema);
module.exports=ApprovedExpert;