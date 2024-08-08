const express = require("express");
const ejs = require("ejs");
const pdf = require("html-pdf");
const router = express.Router();
const NewPatientRequests = require("../models/New_Patients_Requests");
const NewExerciseRequests = require("../models/New_Exercise_Request.js");
const NewFoodRequests = require("../models/New_Food_Request.js");
const Exercises = require("../models/Exercises.js");
const PredParams = require("../models/Prediction_Trained_Params.js");

const indexController = require("../controller/index_controller");
const Food = require("../models/Food.js");
const User = require("../models/User.js");
const SignedUpExperts = require("../models/Signed_Up_Experts.js");
router.use("/auth", require("./auth"));
router.use("/details", require("./details"));
router.use("/exercises", require("./exercises"));
router.use("/exerciseEntry", require("./exercise"));
router.use("/insulinEntry", require("./insulin"));
router.use("/bgEntry", require("./blood_glucose"));
router.use("/food", require("./food"));
router.use("/prediction", require("./prediction"));
router.use("/newExerciseRequest", require("./new_exercise_request"));
router.use("/newFoodRequest", require("./new_food_request"));
var mongodb = require("mongodb");
const Insulin = require("../models/Insulin.js");
const PredictonExtraDetails = require("../models/Prediction_Extra_Details.js");
const PredictionTrainedParams = require("../models/Prediction_Trained_Params.js");
const FoodEntry = require("../models/Food_Entry.js");
const BloodGlucose = require("../models/Blood_Glucose.js");
// const Expert = require("../models/Signed_Up_Experts.js");
function checkAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    // res.redirect(`${process.env.CLIENT_URL}`);
    res.redirect("https://t1-expert.onrender.com/");
  }
}
router.get("/getExperts", (req, res) => {
  SignedUpExperts.find({})
    .then((model) => {
      const list = [];
      for (let i of model) {
        console.log(i);
        const eachObj = {
          _id: i._id,
          email: i.email,
          name: i.name,
        };
        list.push(eachObj);
      }
      console.log(list);
      res.send(list);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getDoctors", checkAuth, (req, res) => {
  SignedUpExperts.find({})
    .then((model) => {
      console.log("my doctors");
      console.log(model);
      res.send(model);
      // const list = [];
      // for (let i of model) {
      //   const eachObj = {
      //     email: i.email,
      //     name: i.name,
      //     clinic_address:i.clinic_address,
      //     dob:i.dob,
      //     phone:i.phone,
      //     medical_reg_no:i.medical_reg_no,
      //     degree:degree,
      //     web_usage_access:i.web_usage_access
      //   };
      //   list.push(eachObj);
      // }
      // console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
      // console.log(list);
      // res.send(list);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getPendingPatients/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  SignedUpExperts.findOne({ email: decodedEmail })
    .then((doctor) => {
      const l = doctor.patients;
      console.log(l);
      NewPatientRequests.find({})
        .then((model) => {
          const ans = [];
          if (model != null) {
            model.map((each) => {
              for (let i in l) {
                if (l[i].email === each.email) ans.push(each);
              }
            });
          }
          console.log(ans);
          res.send(ans);
        })
        .catch((error) => {
          res.send(error);
        });
    })
    .catch((error) => {
      res.send(error);
    });
});
router.get("/getPendingFoods/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  SignedUpExperts.findOne({ email: decodedEmail }).then((doctor) => {
    const l = doctor.patients;
    NewFoodRequests.find({})
      .then((model) => {
        const ans = [];
        if (model != null) {
          model.map((each) => {
            for (let i in l) {
              if (l[i].email === each.email) ans.push(each);
            }
          });
        }
        // console.log(ans);
        res.send(ans);
      })
      .catch((error) => {
        res.send(error);
      });
  });
});
router.get("/getPendingExercises/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  SignedUpExperts.findOne({ email: decodedEmail }).then((doctor) => {
    const l = doctor.patients;
    NewExerciseRequests.find({})
      .then((model) => {
        const ans = [];
        if (model != null) {
          model.map((each) => {
            for (let i in l) {
              if (l[i].email === each.email) ans.push(each);
            }
            // if (l.includes(each.email)) {
            //   ans.push(each);
            // }
          });
        }
        console.log(ans);
        res.send(ans);
      })
      .catch((error) => {
        res.send(error);
      });
  });

  //     .then((model) => {
  //       const ans = [];
  //       if(model!=null){
  //         model.map((each) => {
  //           if (l.includes(each.email)) {
  //             ans.push(each);
  //           }
  //         });
  //       }
  //       console.log(ans);
  //       res.send(ans);
  //     })
  //     .catch((error) => {
  //       res.send(error);
  //     });
  // });
});

router.post("/exerciseAccepted", (req, res) => {
  const { name, b } = req.body;
  Exercises.create({
    A: name,
    B: b,
  })
    .then((obj) => {
      console.log(obj);
      res.send({
        code: 1,
      });
    })
    .catch((err) => {
      res.send({
        code: 0,
      });
    });
});

router.delete("/deleteExerciseRequest/:exercise_name", (req, res) => {
  const { exercise_name } = req.params;
  console.log("WWW" + exercise_name);

  console.log("DFKDKJFD" + req.params);
  NewExerciseRequests.deleteOne({ exercise_name: exercise_name })
    .then((response) => {
      res.send({
        code: 1,
      });
    })
    .catch((error) => {
      res.send({
        code: 0,
      });
    });
});

// router.use('/expertAuth',require('.
router.post("/foodAccepted", (req, res) => {
  const { name, calories, proteins, carbs, fat, servingSize } = req.body;
  Food.create({
    name: name,
    calories,
    carbs,
    protein: proteins,
    fat,
    serving_size: servingSize,
  })
    .then((obj) => {
      console.log(obj);
      res.send({
        code: 1,
      });
    })
    .catch((err) => {
      res.send({
        code: 0,
      });
    });
});

router.delete("/deleteFoodRequest/:food_name", (req, res) => {
  const { food_name } = req.params;
  console.log("WWW" + food_name);

  console.log("DFKDKJFD" + req.params);
  NewFoodRequests.deleteOne({ food_name: food_name })
    .then((response) => {
      res.send({
        code: 1,
      });
    })
    .catch((error) => {
      res.send({
        code: 0,
      });
    });
});

///////////////

router.post("/acceptNewPatientRequest/", (req, res) => {
  const { email } = req.body;

  console.log("DFKDKJFD" + req.params);
  User.findOne({ email: email }).then((user) => {
    if (user) {
      User.updateOne(
        { email: email },
        {
          $set: {
            user_app_usage_eligiblity: true,
          },
        }
      )
        .then((response) => {
          res.send({
            code: 1,
          });
        })
        .catch((error) => {
          res.send({
            code: 0,
          });
        });
    } else {
      res.send({
        code: 1,
      });
    }
  });
});

router.delete("/deleteNewPatientRequest/:email", (req, res) => {
  const { email } = req.params;

  console.log("DFKDKJFD" + req.params);
  NewPatientRequests.deleteOne({ email })
    .then((response) => {
      res.send({
        code: 1,
      });
    })
    .catch((error) => {
      res.send({
        code: 0,
      });
    });
});

router.get("/getFoodDatabase", checkAuth, (req, res) => {
  console.log("food database");
  console.log(req.user);
  Food.find({})
    .then((model) => {
      console.log("thi si smodeee");
      // console.log(model);
      // console.log(model.length);
      // console.log(typeof model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getPatients/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  SignedUpExperts.findOne({ email: decodedEmail }).then((doctor) => {
    const l = doctor.patients;
    console.log("this is the patients list");
    console.log(l);
    User.find({})
      .then((model) => {
        const ans = [];
        if (model != null) {
          model.map((each) => {
            for (let i in l) {
              if (l[i].email === each.email) ans.push(each);
            }
          });
        }
        console.log(ans);
        res.send(ans);
      })
      .catch((error) => {
        res.send(error);
      });
  });

  // .then((model) => {
  //     const ans = [];
  //     if(model!=null){
  //       model.map((each) => {
  //         if (l.includes(each.email)) {
  //           ans.push(each);
  //         }
  //       });
  //     }
  //     console.log(ans);
  //     res.send(ans);
  //   })

  // User.find({ user_app_usage_eligiblity: true })
  //   .then((model) => {
  //     console.log(model);
  //     res.send(model);
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
  // });
});
router.get("/getInsulin", (req, res) => {
  Insulin.find({})
    .then((model) => {
      // console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/getPredictionExtraDetails/:id", (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  // const { email } = req.body;
  PredictonExtraDetails.findOne({ email: decodedEmail })
    .then((model) => {
      console.log(model.extra_detail_entries);
      res.send(model.extra_detail_entries);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getInsulinDetails/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  // console.log("THIS IS INSULI DETAILS " + x);
  // console.log("THIS IS INSULI DETAILS " + email);
  console.log("THIS IS INSULI DETAILS " + id);

  Insulin.findOne({ email: decodedEmail })
    .then((model) => {
      if (model) {
        console.log("DK" + model.insulin_entries_list);

        res.send(model.insulin_entries_list);
      } else {
        console.log("DK");

        return res.send([]);
      }
      // if(!model){
      // }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getFoodDetails/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  FoodEntry.findOne({ email: decodedEmail })
    .then((model) => {
      if (model) {
        console.log("food details", model);

        console.log("food details", model.food_entries_list);
        res.send(model.food_entries_list);
      } else {
        res.send([]);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});
router.post("/changeAppUsagePermission", (req, res) => {
  const { email, value } = req.body;
  User.updateOne(
    { email: email },
    { $set: { user_app_usage_eligiblity: value } }
  )
    .then((obj) => {
      console.log("done");
      res.send({
        code: 1,
        msg: "",
      });

      // res.send({
      //   kq: 1,
      //   msg: "ADD HO GAYO DETAILS",
      // });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});
router.post("/changeDoctorAppUsagePermission", (req, res) => {
  const { email, value } = req.body;
  SignedUpExperts.updateOne(
    { email: email },
    { $set: { web_usage_access: value } }
  )
    .then((obj) => {
      console.log("done");
      res.send({
        code: 1,
        msg: "",
      });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});
router.post("/updatePredictionValues", (req, res) => {
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
    division_by,
    insulin_dose,
    average_breakfast,
    average_lunch,
    average_snack,
    average_dinner,
  } = req.body;
  console.log("uu1xxxxxxxxxxxxx");

  PredParams.updateOne(
    { email: email },
    {
      $set: {
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
        division_by,
        insulin_dose,
        average_breakfast,
        average_lunch,
        average_snack,
        average_dinner,
      },
    }
  )
    .then((obj) => {
      console.log("uu2");
      res.send({
        code: 1,
        msg: "Updated Successfully",
      });
    })
    .catch((err) => {
      res.send({
        code: -1,
        msg: "Update failed",
      });
    });
});

router.post("/changePredictionPermission", (req, res) => {
  const { email, value } = req.body;
  User.updateOne(
    { email: email },
    { $set: { user_insulin_prediction_allowed: value } }
  )
    .then((obj) => {
      console.log("done");
      res.send({
        code: 1,
        msg: "",
      });

      // res.send({
      //   kq: 1,
      //   msg: "ADD HO GAYO DETAILS",
      // });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});

router.get("/getListPatients/:email", (req, res) => {
  const { email } = req.params;
  SignedUpExperts.find({ email }).then((doctor) => {
    res.send(doctor[0].patients);
  });
});

router.get("/getPatientPredExtraDetails/:id", (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  PredictonExtraDetails.findOne({ email: decodedEmail }).then((model) => {
    if (model) {
      res.send(model.extra_detail_entries);
    } else {
      res.send([]);
    }
  });
});

router.get("/getPatientBG/:id", (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  BloodGlucose.findOne({ email: decodedEmail }).then((model) => {
    if (model) {
      res.send(model.bg_entries_list);
    } else {
      res.send([]);
    }
  });
});

router.get("/getPatientInsulin/:id", (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  Insulin.findOne({ email: decodedEmail }).then((model) => {
    if (model) {
      res.send(model.insulin_entries_list);
    } else {
      res.send([]);
    }
  });
});

// router.get("/getPredictionTrainedParams/:id",checkAuth,(req,res)=>{
//   const { id } = req.params;
//   const urlDecodedEmail = decodeURIComponent(id);
//   const decodedEmail = atob(urlDecodedEmail);

//   SignedUpExperts.findOne({ email: decodedEmail }).then((doctor) => {
//     const l = doctor.patients;
//     console.log("this is the patients list");
//     console.log(l);
//     PredictionTrainedParams.find({})
//     .then((model) => {
//         const ans = [];
//         if(model!=null){
//           model.map((each) => {
//             for(let i in l){
//               if(l[i].email===each.email)ans.push(each);
//             }
//             });
//         }
//         console.log(ans);
//         res.send(ans);
//       })
//     .catch((error) => {
//       res.send(error);
//     });
// });

// })
router.get("/getPredictionTrainedParams/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  // console.log("THIS IS INSULI DETAILS " + x);
  // console.log("THIS IS INSULI DETAILS " + email);
  console.log("THIS IS INSULI DETAILS " + id);

  PredictionTrainedParams.findOne({ email: decodedEmail })
    .then((model) => {
      if (model) {
        console.log("pred params values");
        console.log(model);
        res.send(model);
      } else {
        console.log("DK");

        return res.send([]);
      }
      // if(!model){
      // }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/downloadPDF/:id", async (req, res) => {
  const { id } = req.params;
  var uniqueNames = [
    {
      Fasting: "",
      abf: "",
      bl: "",
      al: "",
      bd: "",
      ad: "",
      threeam: "",
      CURRENT_DATE: "",
      CURRENT_TIME: "",
      CURRENT_BG: "",
      Fastingin: "",
      abfin: "",
      blin: "",
      alin: "",
      bdin: "",
      adin: "",
      threeamin: "",
    },
  ];

  const pred = await PredictonExtraDetails.findOne({ email: id });
  const bg = await BloodGlucose.findOne({ email: id });
  const insulin = await Insulin.findOne({ email: id });

  let exam = [];
  let exambg = [];
  let examinsulin = [];
  if (pred != null) {
    exam = pred.extra_detail_entries;
  }
  if (bg != null) {
    exambg = bg.bg_entries_list;
  }
  if (insulin != null) {
    examinsulin = insulin.insulin_entries_list;
  }

  console.log("predModel", exambg);
  if (exam != null) {
    exam.map((varrr) => {
      let obj = uniqueNames.find(
        (o) =>
          o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString() &&
          o.CURRENT_TIME === varrr.time
      );
      // console.log(obj)
      if (obj == null) {
        let obj2 = uniqueNames.find(
          (o) => o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString()
        );
        if (obj2 == null) {
          if (varrr.FOOD_CATEGORY == "Breakfast") {
            let tryth = {
              Fasting: varrr.current_bg,
              abf: "--",
              bl: "--",
              al: "--",
              bd: "--",
              ad: "--",
              threeam: "--",
              CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
              CURRENT_TIME: varrr.time,
              CURRENT_BG: varrr.current_bg,
              Fastingin: "--",
              abfin: "--",
              blin: "--",
              alin: "--",
              bdin: "--",
              adin: "--",
              threeamin: "--",
            };
            uniqueNames.push(tryth);
          } else if (varrr.food_category == "Lunch") {
            let tryth = {
              Fasting: "--",
              abf: "--",
              bl: varrr.current_bg,
              al: "--",
              bd: "--",
              ad: "--",
              threeam: "--",
              CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
              CURRENT_TIME: varrr.time,
              CURRENT_BG: varrr.current_bg,
              Fastingin: "--",
              abfin: "--",
              blin: "--",
              alin: "--",
              bdin: "--",
              adin: "--",
              threeamin: "--",
            };
            uniqueNames.push(tryth);
          } else if (varrr.food_category == "Dinner") {
            let tryth = {
              Fasting: "--",
              abf: "--",
              bl: "--",
              al: "--",
              bd: varrr.current_bg,
              ad: "--",
              threeam: "--",
              CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
              CURRENT_TIME: varrr.time,
              CURRENT_BG: varrr.current_bg,
              Fastingin: "--",
              abfin: "--",
              blin: "--",
              alin: "--",
              bdin: "--",
              adin: "--",
              threeamin: "--",
            };
            uniqueNames.push(tryth);
          }
        } else {
          let tryth = obj2;
          if (varrr.food_category == "Lunch") {
            tryth.bl = varrr.current_bg;
            uniqueNames.pop(tryth);
            uniqueNames.push(tryth);
          } else if (varrr.FOOD_CATEGORY == "Breakfast") {
            tryth.Fasting = varrr.current_bg;
            uniqueNames.pop(tryth);
            uniqueNames.push(tryth);
          } else if (varrr.FOOD_CATEGORY == "Dinner") {
            tryth.bd = varrr.current_bg;
            uniqueNames.pop(tryth);
            uniqueNames.push(tryth);
          }
        }
        // uniqueNames.push(tryth);
        // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
        // Listin.push(varrr.CURRENT_DATE)
      }
    });
  }
  if (examinsulin != null) {
    examinsulin.map((varrr) => {
      let obj = uniqueNames.find(
        (o) => o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString()
      );
      // console.log(obj)

      if (obj == null) {
        if (varrr.category == "Pre-breakfast") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: varrr.amount,
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.category == "Pre-lunch") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: varrr.amount,
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.category == "Pre-dinner") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: varrr.amount,
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.category == "Bed-time") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: varrr.amount,
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        }
        // uniqueNames.push(tryth);
        // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
        // Listin.push(varrr.CURRENT_DATE)
      } else {
        let tryth = obj;
        // {console.log(obj)}
        if (varrr.category == "Pre-lunch") {
          tryth.blin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        } else if (varrr.category == "Pre-breakfast") {
          tryth.Fastingin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        } else if (varrr.category == "Pre-dinner") {
          tryth.bdin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        } else if (varrr.category == "Bed-time") {
          tryth.adin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        }
      }
    });
  }
  if (exambg != null) {
    exambg.map((varrr) => {
      let obj = uniqueNames.find(
        (o) => o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString()
      );
      // console.log(obj)

      if (obj == null) {
        if (varrr.type == "Fasting") {
          let tryth = {
            Fasting: varrr.value,
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.type == "2 hrs after breakfast") {
          let tryth = {
            Fasting: "--",
            abf: varrr.value,
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.type == "Before lunch") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: varrr.value,
            al: "--",
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.type == "2 hrs after lunch") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: varrr.value,
            bd: "--",
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.type == "Before dinner") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: varrr.value,
            ad: "--",
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: new Date(varrr.date).toLocaleDateString(),
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.type == "2 hrs after dinner") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: varrr.value,
            threeam: "--",
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        } else if (varrr.type == "3:00 am") {
          let tryth = {
            Fasting: "--",
            abf: "--",
            bl: "--",
            al: "--",
            bd: "--",
            ad: "--",
            threeam: varrr.value,
            CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
            CURRENT_TIME: varrr.time,
            CURRENT_BG: "--",
            Fastingin: "--",
            abfin: "--",
            blin: "--",
            alin: "--",
            bdin: "--",
            adin: "--",
            threeamin: "--",
          };

          uniqueNames.push(tryth);
        }
        // uniqueNames.push(tryth);
        // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
        // Listin.push(varrr.CURRENT_DATE)
      } else {
        let tryth = obj;
        // {console.log(obj)}
        if (varrr.category == "Pre-lunch") {
          tryth.blin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        } else if (varrr.category == "Pre-breakfast") {
          tryth.Fastingin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        } else if (varrr.category == "Pre-dinner") {
          tryth.bdin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        } else if (varrr.category == "Bed-time") {
          tryth.adin = varrr.amount;
          uniqueNames.pop(tryth);
          uniqueNames.push(tryth);
        }
      }
    });
  }
  try {
    // Render EJS template to HTML
    // F:\Back End Web Development Codes\T1L Backend\routes\downloadRecordApp.ejs
    const html = await ejs.renderFile("downloadRecordApp.ejs", { uniqueNames });

    // Generate PDF from HTML
    pdf.create(html).toBuffer((err, stream) => {
      if (err) {
        res.status(500).send("Error generating PDF");
        return;
      }

      console.log("PDF GENEREATED SUCCESSFULLY");
      // Send PDF as response
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');
      res.send(stream);
      // stream.pipe(res);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
