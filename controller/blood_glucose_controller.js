const Bg=require('../models/Blood_Glucose.js');
module.exports.addBloodGlucose=function(req,res){
  var {email,value,date,time,type}=req.body;
  console.log("this si calledddddbgg"+email);
  Bg.updateOne(
      {"email": email}, 
      {$push:{
       bg_entries_list:{
          value:value,
          time:time,
          date:date,
          blood_glucose_type:type,
        }

      }},
      {
          multi:true,
          upsert:true
      
      })
      .then((obj) => {
      res.send({
          kq: 1,
          msg: "Blood Glucose Entry done",
          });

})
   .catch((err) => {
      console.log('Error: ' + err);
  });
}


