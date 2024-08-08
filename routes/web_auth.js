const express = require("express");
const router = express.Router();
// const logout = require("express-passport-logout");
const passport = require("passport");
var Expert = require("../models/Signed_Up_Experts");
router.get("/login/success", (req, res) => {
  console.log("/login/success");
  console.log(req.sessions);

  if (req.user) {
    console.log("user is found");
    res.send({
      success: true,
      message: "Success",
      user: req.user,
    });
  } else {
    console.log("user is not found");
    res.status(404).json({
      error: true,
      message: "aa Authorized",
    });
  }
});
router.get("/login/failed", (req, res) => {
  console.log("/login/failed");

  res.status(401).json({
    error: true,
    message: "Log in Failure",
  });
});
// /auth/web/login/success
//   /auth/web/login/failed
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://t1-expert.onrender.com/",
    // successRedirect: "http://localhost:3000/",

    failureRedirect: `${process.env.CLIENT_URL}/login/unApproved`,
  })
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);
router.post("/details", (req, res) => {
  console.log("create account called backend");

  var { email, name, dob, address, phone, reg, degree: degree } = req.body;

  console.log("this is the email backend  " + email);
  Expert.findOne({ email: email }).then((existing) => {
    console.log("found the expert in databse");
    if (existing) {
      console.log("found the expert in databse22");

      Expert.updateOne(
        { email: email },
        {
          $set: {
            name: name,
            dob: dob,
            clinic_address: address,
            medical_reg_no: reg,
            degree: degree,
            phone: phone,
          },
        }
      ).then((x) => {
        console.log("create account called backend then");

        res.send({
          code: 1,
          msg: "",
        });
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("This is the logour err", err);
    }
    res.redirect("https://t1-expert.onrender.com/");
    // res.redirect("http://localhost:3000/");
  });
});
module.exports = router;
