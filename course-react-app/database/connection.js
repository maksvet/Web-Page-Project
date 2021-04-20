const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "nodeclient",
  password: "123456",
  database: "FS1030IndividualProject",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("Database connected");
});

module.exports = connection;
