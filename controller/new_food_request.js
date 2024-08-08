const NewFoodRequests = require("../models/New_Food_Request.js");

module.exports.sendRequest = function (req, res) {
  var { food_name, email } = req.body;
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  NewFoodRequests.create({ food_name: food_name, email })
    .then((obj) => {
      res.send({
        code: 1,
        msg: "Food Entered",
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
