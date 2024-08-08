const Insulin=require('../models/Insulin.js');
module.exports.addInsulin=function(req,res){
  var {email,amount,category,correction_dose,date,time,type}=req.body;
  console.log("this si calledddddinsulin"+email);
  Insulin.updateOne(
      {"email": email}, 
      {$push:{
       insulin_entries_list:{
          amount:amount,
          time:time,
          category:category,
          date:date,
          type:type,
          correction_dose:correction_dose
        }

      }},
      {
          multi:true,
          upsert:true
      
      })
      .then((obj) => {
      res.send({
          kq: 1,
          msg: "Insulin Entry done",
          });

})
   .catch((err) => {
      console.log('Error: ' + err);
  });
}


