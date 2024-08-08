const Pred = require("../models/Prediction_Values_Status.js");
const PredParams = require("../models/Prediction_Trained_Params.js");
const PredExtraDetails = require("../models/Prediction_Extra_Details.js");
const NewPatientRequest = require("../models/New_Patients_Requests.js");
const User = require("../models/User.js");
module.exports.acceptPrediction = function (req, res) {
  var {
    email,
    amount,
    date,
    time,
    status,
    insulin_dose,
    prev_insulin_time
  } = req.body;
  PredParams.updateOne(
    {"email": email}, 
    {$set:{
      insulin_dose:insulin_dose,
      prev_insulin_time:prev_insulin_time
    }},
    {
        multi:true,
        upsert:true
    })
    .then((obj) => {
    // res.send({
    //     kq: 1,
    //     msg: "Exercise Entered",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('Error: ' + err);
      });

  Pred.findOne({email:email}).then((existingUser)=>{
    if(!existingUser){
      Pred.create({
        email: email,
      })
        .then(() => {
          /////
          Pred.updateOne(
            {"email": email}, 
            {$push:{
              prediction_entries_with_status:{
                amount:amount,
                date:date,
                time:time,
                status:status,
              }
        
            }},
            {
                multi:true,
                upsert:true
            
            })
            .then((obj) => {
            res.send({
                kq: 1,
                msg: "Exercise Entered",
                });
        
        })
         .catch((err) => {
            console.log('Error: ' + err);
        });
        
        });


    }
    else{
      Pred.updateOne(
        {"email": email}, 
        {$push:{
          prediction_entries_with_status:{
            amount:amount,
            date:date,
            time:time,
            status:status,
      }
    
        }},
        {
            multi:true,
            upsert:true
        
        })
        .then((obj) => {
        res.send({
            kq: 1,
            msg: "Exercise Entered",
            });
    
    })
     .catch((err) => {
        console.log('Error: ' + err);
    });
    }
  });
};
///

module.exports.rejectPrediction = function (req, res) {
  var {
    email,
    amount,
    date,
    time,
    status,
    insulin_dose,
    prev_insulin_time
  } = req.body;

  Pred.findOne({email:email}).then((existingUser)=>{
    if(!existingUser){
      Pred.create({
        email: email,
      })
        .then(() => {
          /////
          Pred.updateOne(
            {"email": email}, 
            {$push:{
              prediction_entries_with_status:{
                amount:amount,
                date:date,
                time:time,
                status:status,
              }
        
            }},
            {
                multi:true,
                upsert:true
            
            })
            .then((obj) => {
            res.send({
                kq: 1,
                msg: "Exercise Entered",
                });
        
        })
         .catch((err) => {
            console.log('Error: ' + err);
        });
        
        });


    }
    else{
      Pred.updateOne(
        {"email": email}, 
        {$push:{
          prediction_entries_with_status:{
            amount:amount,
            date:date,
            time:time,
            status:status,
      }
    
        }},
        {
            multi:true,
            upsert:true
        
        })
        .then((obj) => {
        res.send({
            kq: 1,
            msg: "Exercise Entered",
            });
    
    })
     .catch((err) => {
        console.log('Error: ' + err);
    });
    }
  });
};
module.exports.getPredictionParams=function(req,res){
  var {email}=req.params;

  PredParams.findOne({email:email}).then((params)=>{
    if(params){
      res.send(params);
    }
    else{
      res.send({
        code: 0,
        msg: "Not found",
      });

    }
  })
}
//
module.exports.getPredictionStatus = function (req, res) {
  console.log("Prediction called");
  var { email } = req.params;

  console.log(email);
  User.findOne({ email: email }).then((existingUser) => {
    if (existingUser.user_insulin_prediction_allowed) {
      res.send({
        code: 1,
        msg: "Prediction allowed",
      });
    } else {
      res.send({
        code: 0,
        msg: "Prediction not allowed",
      });
    }
  });
};
module.exports.addPrediction = function (req, res) {
  var { email, amount, date, time, status } = req.body;
  console.log("this si calledddddbgg" + email);
  Pred.updateOne(
    { email: email },
    {
      $push: {
        prediction_entries_with_status: {
          amount: amount,
          time: time,
          date: date,
          status: status,
        },
      },
    },
    {
      multi: true,
      upsert: true,
    }
  )
    .then((obj) => {
      res.send({
        kq: 1,
        msg: "Prediction Entry done",
      });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

module.exports.addExtraDetails = function (req, res) {
  var {
    email,
    current_bg,
    date,
    time,
    food_name,
    food_quantity,
    food_category,
  } = req.body;
  console.log("this si calledddddbgg" + email);
  PredExtraDetails.updateOne(
    { email: email },
    {
      $push: {
        extra_detail_entries: {
          current_bg: current_bg,
          time: time,
          date: date,
          food_name: food_name,
          food_quantity: food_quantity,
          food_category: food_category,
        },
      },
    },
    {
      multi: true,
      upsert: true,
    }
  )
    .then((obj) => {
      res.send({
        kq: 1,
        msg: "Prediction Entry done",
      });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

module.exports.updateParamsAndroid = function (req, res) {
  console.log("aaaa99");
  var {
    email,
    breakfast_icr,
    breakfast_isf,
    lunch_icr,
    lunch_isf,
    snack_icr,
    snack_isf,
    dinner_icr,
    dinner_isf,
    icr,
    isf,
  } = req.body;

  PredParams.findOne({
    email: email,
  }).then((existingUser) => {
    if (!existingUser) {
      // var {
      //     email,
      //     breakfast_icr,
      //     breakfast_isf,
      //     lunch_icr,
      //     lunch_isf,
      //     snack_icr,
      //     snack_isf,
      //     dinner_icr,
      //     dinner_isf,
      //     icr,
      //     isf,
      // }
      //     =req.body;
      console.log("params added");

      PredParams.create({
        email: email,
        breakfast_icr: breakfast_icr,
        breakfast_isf: breakfast_isf,
        lunch_icr: lunch_icr,
        lunch_isf: lunch_isf,
        snack_icr: snack_icr,
        snack_isf: snack_isf,
        dinner_icr: dinner_icr,
        dinner_isf: dinner_isf,
        icr: icr,
        isf: isf,
        // insulin_dose:insulin_dose,
        // division_by:divison_by,
        // prev_insulin_time:prev_insulin_time
      })
        .then(() => {
          NewPatientRequest.findOne({ email: email }).then((existingUser) => {
            if (existingUser) {
              res.send({
                code: 0,
                msg: "",
              });
            } else {
              res.send({
                code: 1,
                msg: "",
              });
            }
          });
        })
        .catch((err) => {
          res.send({
            kq: 0,
            msg: "kết nối DB thất bại",
          });
          console.error(err);
        });                                              
      // new User({ googleId: userid }).save();
    } else {
      console.log("params added2");
      
      res.send({
        kq: 1,
        code:40,
        msg: "Params Updated!!",
      });

      // var {
      //     insulin_dose,
      //     prev_insulin_time

      // }
      //     =req.body;

      // PredParams.updateOne(
      //     {"email": email},
      //     {$set:{ average_breakfast:average_breakfast,
      //         average_lunch:average_lunch,
      //         average_snack:average_snack,
      //         average_dinner:average_dinner,
      //         breakfast_icr:breakfast_icr,
      //         breakfast_isf:breakfast_isf,
      //         lunch_icr:lunch_icr,
      //         lunch_isf:lunch_isf,
      //         snack_icr:snack_icr,
      //         snack_isf:snack_isf,
      //         dinner_icr:dinner_icr,
      //         dinner_isf:dinner_isf,
      //         icr:icr,
      //         isf:isf,
      //         insulin_dose:insulin_dose,
      //         division_by:divison_by,
      //         prev_insulin_time:prev_insulin_time

      //     }},
      //     {
      //         multi:true,
      //         upsert:true

      //     })
      //     .then((obj) => {
      //     res.send({
      //         kq: 1,
      //         msg: "Params Updated!!",
      //         });
      //     })
    }
  });
};

module.exports.updateParamsFromBackendTraining = function (req, res) {
  PredParams.findOne({
    email: email,
  }).then((existingUser) => {
    if (!existingUser) {
      var {
        email,
        average_breakfast,
        average_lunch,
        average_snack,
        average_dinner,
        breakfast_icr,
        breakfast_isf,
        lunch_icr,
        lunch_isf,
        snack_icr,
        snack_isf,
        dinner_icr,
        dinner_isf,
        icr,
        isf,
        insulin_dose,
        division_by,
        prev_insulin_time,
      } = req.body;

      PredParams.create({
        email: email,
        average_breakfast: average_breakfast,
        average_lunch: average_lunch,
        average_snack: average_snack,
        average_dinner: average_dinner,
        breakfast_icr: breakfast_icr,
        breakfast_isf: breakfast_isf,
        lunch_icr: lunch_icr,
        lunch_isf: lunch_isf,
        snack_icr: snack_icr,
        snack_isf: snack_isf,
        dinner_icr: dinner_icr,
        dinner_isf: dinner_isf,
        icr: icr,
        isf: isf,
        insulin_dose: insulin_dose,
        division_by: divison_by,
        prev_insulin_time: prev_insulin_time,
      })
        .then(() => {
          res.send({
            kq: 1,
            msg: "Params added!!",
          });
        })
        .catch((err) => {
          res.send({
            kq: 0,
            msg: "kết nối DB thất bại",
          });
          console.error(err);
        });
      // new User({ googleId: userid }).save();
    } else {
      var { insulin_dose, prev_insulin_time } = req.body;

      PredParams.updateOne(
        { email: email },
        {
          $set: {
            average_breakfast: average_breakfast,
            average_lunch: average_lunch,
            average_snack: average_snack,
            average_dinner: average_dinner,
            breakfast_icr: breakfast_icr,
            breakfast_isf: breakfast_isf,
            lunch_icr: lunch_icr,
            lunch_isf: lunch_isf,
            snack_icr: snack_icr,
            snack_isf: snack_isf,
            dinner_icr: dinner_icr,
            dinner_isf: dinner_isf,
            icr: icr,
            isf: isf,
            division_by: divison_by,
          },
        },
        {
          multi: true,
          upsert: true,
        }
      ).then((obj) => {
        res.send({
          kq: 1,
          msg: "Params Updated!!",
        });
      });
    }
  });
};
