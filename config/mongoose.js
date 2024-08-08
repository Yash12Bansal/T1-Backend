var mongoose = require("mongoose");
// mongodb://localhost/T1LifeDB
// "mongodb+srv://samwilson14111:e53tJB2McTvAzlst@t1lcluster.rn9wgur.mongodb.net/?retryWrites=true&w=majority&appName=T1LCluster"
mongoose.connect("mongodb+srv://samwilson14111:e53tJB2McTvAzlst@t1lcluster.rn9wgur.mongodb.net/?retryWrites=true&w=majority&appName=T1LCluster");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error dbs"));
db.once("open", function () {
  console.log("Success connection the database mongo");
});

module.exports = db;
