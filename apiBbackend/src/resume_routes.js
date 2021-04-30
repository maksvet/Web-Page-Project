import express from 'express'
const router = express.Router()

import { db } from '.././database/connection.js'

import dotenv from "dotenv";
dotenv.config();

//Personal info
//Skills
//Highlights of qualification
//Work experiense
//Education
//Training courses


router.post("/admin", async (req, res) => {

    
  // Get payload
  const {
    //skill 1
skill,

//highlights_qualifications 2
qualification,

//contact_info 3
name,
phone,
email,

//address 4
country,
province,
city,
street_address,

//date_to 5
start_date,
finish_date,

//education 6
education_title,

//work_experience 7
position,

//task 8
task,

//training_course 9
training_title

  } = req.body;

const sql1 = `INSERT INTO ${process.env.DBNAME}.skill
(slill) VALUES ('${skill}');`;



const sql2 = `INSERT INTO ${process.env.DBNAME}.highlights_qualifications
(qualification) VALUES ('${qualification}');`;

`INSERT INTO ${process.env.DBNAME}.contact_info
(input_id, contact_id, content) VALUES ( '${input_id}', '${contact_id}', '${content}', LAST_INSERT_ID());`


const sql3 = `INSERT INTO ${process.env.DBNAME}.contact_info
( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}', LAST_INSERT_ID());`;

// const sql4 = `INSERT INTO ${process.env.DBNAME}.address
// ( country, province, city, street_address ) VALUES ( '${country}', '${province}', '${city}', '${street_address}', LAST_INSERT_ID());`;

// const sql5 = `INSERT INTO ${process.env.DBNAME}.date_to
// ( start_date, finish_date ) VALUES ( '${start_date}', '${finish_date}', LAST_INSERT_ID());`;

// const sql6 = `INSERT INTO ${process.env.DBNAME}.education
// ( education_title ) VALUES ( '${education_title}', LAST_INSERT_ID());`;

// const sql7 = `INSERT INTO ${process.env.DBNAME}.work_experience
// ( position ) VALUES ( '${position}')`;

// const sql8 = `INSERT INTO ${process.env.DBNAME}.task
// ( task ) VALUES ( '${task}', LAST_INSERT_ID());`;

// const sql9 = `INSERT INTO ${process.env.DBNAME}.training_course
// ( training_title ) VALUES ( '${training_title}', LAST_INSERT_ID());`;

  try {
    await db.beginTransaction();
    await db.query(sql1);
    await db.query(sql2);
    const results = await db.query(sql3);
    await db.commit();
    dbStatus(res, results);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});