const User = require("../models/User.js");
const NewPatientRequest = require("../models/New_Patients_Requests.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "550164351391-335ovnajfvmmce9u2eesnrrpjpocsgqc.apps.googleusercontent.com"
);
const authCheck = (req, res, next) => {
  if (!req.user) {
    
  } else {
    next();
  }
};
module.exports.authenticate = function (req, res) {
  console.log("evaluating post");
  console.log(req.body);
  const { idToken } = req.body;
  verify(req.body, res).catch(console.error);
  async function verify(data, res) {
    const { idToken: token } = data;
    const { email: id } = data;
    const ticket = await client.verifyIdToken({
      idToken: token,
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    console.log(payload);
    const userid = payload["sub"];
    console.log(userid);
    User.findOne({ email: id }).then((existingUser) => {
      // console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
      // console.log(existingUser);
      // console.log(typeof(existingUser))
      // console.log(existingUser.hasOwnProperty('name'))
      // console.log(existingUser.hasOwnProperty('email'))
      // console.log(Object.keys(existingUser))

      if (!existingUser) {
        NewPatientRequest.create({
          email: id,
        })
          .then(() => {
            User.create({ email: id, ss: { name: "Raghav" } })
              .then(() => {
                res.send({
                  code: 2,
                  msg: "",
                });
              })
              .catch((err) => {
                res.send({
                  code: -1,
                  msg: "",
                });
                console.error(err);
              });
          })
          .catch((err) => {
            res.send({
              code: -1,
              msg: "",
            });
            console.error(err);
          });

        // new User({ googleId: userid }).save();
      } else {
        // console.log(typeof(existingUser))
        // console.log(existingUser.name)
        // console.log(existingUser.hasOwnProperty('name'))
        // console.log(existingUser.hasOwnProperty('email'))
        // console.log(Object.keys(existingUser.Object))
        if (existingUser.toJSON().hasOwnProperty("name")) {
          console.log("hello111");
          if (!existingUser.toJSON().user_app_usage_eligiblity) {
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
          // NewPatientRequest.findOne({ email: id }).then((existingUser) => {
          //   if (existingUser ) {
          //     res.send({
          //       code: 0,
          //       msg: "",
          //     });
          //   } else {
          //     res.send({
          //       code: 1,
          //       msg: "",
          //     });
          //   }
          // });
        } else {
          console.log("hello2222");
          res.send({
            code: 3,
            msg: "",
          });

          // NewPatientRequest.findOne({ email: id }).then((existingUser) => {
          //   if (existingUser) {
          //   } else {
          //     res.send({
          //       code: 4,
          //       msg: "",
          //     });
          //   }
          // });
        }

        // res.send({
        //   kq: 1,
        //   msg: "Phele se hi tha re User in the database",
        // });
      }
    });
  }
};
