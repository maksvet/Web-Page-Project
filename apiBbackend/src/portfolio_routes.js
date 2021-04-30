import express from 'express'
// import { v4 as uuidv4 } from 'uuid'
// import util from 'util'
// import fs from 'fs'
// import path from 'path'
// const readFile = util.promisify(fs.readFile)
// const writeFile = util.promisify(fs.writeFile)
// const entrPath = path.resolve('data/entries.json')
// const usrPath = path.resolve('data/users.json')
const router = express.Router()
import cors from "cors";

const app = express();
app.use(cors());


// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
// import { db } from '.././database/connection.js'
// import { badRequest, objProps, objUserProps, message, validateItem, validateUser, validateString,
//     validateEmail, validatePhone, validatePswd, returnMessage, authToken
// } from './helpFns.js'
import { db } from '.././database/connection.js'
import dotenv from "dotenv";
dotenv.config();


//middleware
app.use(express.json());


app.get("/api/cats", (req, res) => {
    db.query("SELECT * FROM portfolio", function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    });
  });