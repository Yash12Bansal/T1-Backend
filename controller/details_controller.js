const User = require("../models/User.js");
const NewPatientRequest = require("../models/New_Patients_Requests.js");
const Expert = require("../models/Signed_Up_Experts.js");
module.exports.addDetails = function (req, res) {
  var {
    email,
    name,
    gender,
    dob,
    phone,
    doses,
    yearOfDiagnosis,
    weight,
    height,
    doctorName,
  } = req.body;
  console.log("this si calleddddd" + email);
  NewPatientRequest.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      NewPatientRequest.updateOne(
        { email: email },
        {
          $set: {
            name: name,
          },
        }
      ).then((obj) => {
        const filter = {
          email: {
            $in: [
              "samwilson14111@gmail.com",
              "docrajivsingla@gmail.com",
              doctorName,
            ],
          },
        };
        Expert.updateMany(
          // {'name':doctorName},
          filter,
          {
            $push: {
              patients: {
                email: email,
              },
            },
          }
          //   {
          //     multi:true,
          //     upsert:true

          // }
        )
          .then((obj) => {
            User.updateOne(
              { email: email },
              {
                $set: {
                  name: name,
                  sex: gender,
                  dob: dob,
                  total_doses: doses,
                  doctor_name: doctorName,
                  year_of_diabetes_diagnosis: yearOfDiagnosis,
                  weight: weight,
                  height: height,
                  phone: phone,
                },
              }
              // {
              //   multi: true,
              //   upsert: true,
              // }
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

            // res.send({
            //     kq: 1,
            //     msg: "Blood Glucose Entry done",
            //     });
          })
          .catch((err) => {
            console.log("Error: " + err);
          });
      });
    } else {
      // {$or:[{"doctor_name":doctorName},{"doctor_name":"Sam Wilson"}]},
      const filter = {
        email: {
          $in: [
            "samwilson14111@gmail.com",
            "docrajivsingla@gmail.com",
            doctorName,
          ],
        },
      };

      Expert.updateMany(
        // {name:doctorName},
        filter,
        {
          $push: {
            patients: {
              email: email,
            },
          },
        }
        //   {
        //     multi:true,
        //     upsert:true

        // }
      )
        .then((obj) => {
          User.updateOne(
            { email: email },
            {
              $set: {
                name: name,
                sex: gender,
                dob: dob,
                total_doses: doses,
                doctor_name: doctorName,
                year_of_diabetes_diagnosis: yearOfDiagnosis,
                weight: weight,
                height: height,
                phone: phone,
              },
            }
            // {
            //   multi: true,
            //   upsert: true,
            // }
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

          // res.send({
          //     kq: 1,
          //     msg: "Blood Glucose Entry done",
          //     });
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  });
};

// function(err, numberAffected){
//     if(err){
//         res.send({
//             kq: 0,
//             msg: "kết nối DB thất bại",
//             });
//             console.error(err);
//     }
//     else{
//         res.send({
//             kq: 1,
//             msg: "ADD HO GAYO DETAILS",
//             });

//     }

// }
