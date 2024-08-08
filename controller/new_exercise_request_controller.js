const NewExerciseRequests = require("../models/New_Exercise_Request.js");

module.exports.sendRequest = function (req, res) {
  var { exercise_name,email } = req.body;
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  NewExerciseRequests.create(
    {exercise_name: exercise_name, email:email})
    .then((obj) => {
      res.send({
        code: 1,
        msg: "Exercise Entered",
      });
    })
    .catch((err) => {
      res.send({
        code: 0,
        msg: "Problem",
      });

      console.log("Error: " + err);
    });
};
