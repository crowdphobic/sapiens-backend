const mongoose = require("mongoose");

function dbConfig() {
  mongoose
    .connect(
      process.env.DBCONNECTION,
      {
        useNewUrlParser: true
      }
    )
    .then(() => console.log("connected to database"))
    .catch(err => console.log("could not connect to mongodb" + err));
}

//exporting the connection and configuration
module.exports.dbConfig = dbConfig;