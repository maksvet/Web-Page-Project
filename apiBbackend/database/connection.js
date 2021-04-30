import mysql from "mysql";
import dotenv from "dotenv";
import util from "util";
dotenv.config();

//const mysql = require("mysql");
const config = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
};

const conn = (config) => {
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) throw err;
    console.log(
      `Database connected! ${process.env.DBUSER} @ ${process.env.DBNAME} `
    );
  });
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
    beginTransaction() {
      return util.promisify(connection.beginTransaction).call(connection);
    },
    commit() {
      return util.promisify(connection.commit).call(connection);
    },
    rollback() {
      return util.promisify(connection.rollback).call(connection);
    },
  };
};

export const db = conn(config);

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "nodeclient",
//   password: "123456",
//   database: "FS1030IndividualProject",
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("Database connected");
// });

// module.exports = connection;