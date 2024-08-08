const Exercises=require('../models/Exercises.js');
const Exercise=require('../models/Exercise.js');
module.exports.getExercises=function(req,res){
  Exercises.find({})
  .then(model=> {
    console.log(model);
     res.send(model);

  }).catch(error=>{
    res.send(error);
  });
}

module.exports.addExercise=function(req,res){
  var {email,currentTime,endTime,startTime,date,exercise}=req.body;
  // date=
  console.log("this si calleddddd"+email);
  Exercise.updateOne(
      {"email": email}, 
      {$push:{
        exercise_entries_list:{
          current_time:currentTime,
          end_time:endTime,
          start_time:startTime,
          date:date,
          exercise:exercise
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


