import mysql from "mysql";
import dotenv from "dotenv";
import util from "util";
dotenv.config();
// modifying env iaw connection lab for GCP connection
const config = {
  // host: process.env.DBHOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
};
// adding lines iaw connection lab
if (process.env.DATABASE_SOCKET) {
  config.socketPath = process.env.DATABASE_SOCKET
} else {
  config.host = process.env.DATABASE_HOST
}
// end of new addition
const conn = (config) => {
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) throw err;
    console.log(
      `Database connected! ${process.env.DATABASE_USER} @ ${process.env.DATABASE_NAME} `
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
