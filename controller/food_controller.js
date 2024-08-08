const Food = require("../models/Food.js");
const FoodEntry=require('../models/Food_Entry.js');
module.exports.getFood=function(req,res){
  Food.find({})
  .then(model=> {
    console.log(model);
     res.send(model);

  }).catch(error=>{
    res.send(error);
  });

  
    // var {name,calories,fat,protein,carbs,serving_size}=req.body;
    // console.log("I am called");
    //         Food.create({ 
    //             name:name,
    //             calories:calories,
    //             fat:fat,
    //             protein:protein,
    //             carbs:carbs,
    //             serving_size:serving_size
    //         })
    //         .then(() => {
    //             res.send({
    //             kq: 1,
    //             msg: "FFOOFDODO",
    //             });
    //           })
    //           .catch((err) => {
    //             res.send({
    //               kq: 0,
    //               msg: "kết nối DB thất bại",
    //             });
    //             console.error(err);
    //           });
    //         // new User({ googleId: userid }).save();
      
}


module.exports.addFood=function(req,res){
  var {email,date,time,food_name,food_quantity,food_category}=req.body;
  console.log("this si calledddddbgg"+email);
  
  FoodEntry.updateOne(
      {"email": email}, 
      {$push:{
        food_entries_list:{
          time:time,
          date:date,
          food_name:food_name,
          food_quantity:food_quantity,
          
          food_category:food_category
        }
      }},
      {
          multi:true,
          upsert:true
      
      })
      .then((obj) => {
      res.send({
          kq: 1,
          msg: "Food Entry done",
          });

})
   .catch((err) => {
      console.log('Error: ' + err);
  });

};


