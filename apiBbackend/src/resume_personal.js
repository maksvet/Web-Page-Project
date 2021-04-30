import express from 'express'
const router = express.Router()
import { db } from '.././database/connection.js'
import dotenv from "dotenv";
dotenv.config();

//kept for developing only
const dbStatus = (res, results) => {
  if (results.affectedRows !== 0)
    return res.status(200).json(`Database successfully updated!`);
  return res.status(400).json(`Error: database not updated!!`);
};

router.get('/resume/personal', async (req, res) => {
  //const entries = await db.query(`SELECT cfi.input_id, cfi.time_stamp, cfi.content, ci.name, ci.phone, ci.email FROM ${process.env.DBNAME}.contact_form_input cfi INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( cfi.contact_id = ci.contact_id  )    `)
  res.status(200).send("entries")
  }
)


router.post("/resume/personal", async (req, res) => {
  // Get payload
  const {
    //skill
	skill,
	
	//highlights_qualifications
	qualification,
	
	//contact_info
	name,
	phone,
	email,

	//address
	country,
	province,
	city,
	street_address
	
  } = req.body

const sql1 = `INSERT INTO ${process.env.DBNAME}.skill (skill) VALUES ('${skill}');`

const sql2 = `INSERT INTO ${process.env.DBNAME}.highlights_qualifications (qualification) VALUES ('${qualification}');`
	
const sql3 = `INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}');`
	
const sql4 = `INSERT INTO ${process.env.DBNAME}.address
	( country, province, city, street_address, contact_id ) VALUES ( '${country}', '${province}', '${city}', '${street_address}', LAST_INSERT_ID()); )`
	
const sql5 = `INSERT INTO ${process.env.DBNAME}.personal_info SELECT (contact_id, address_id) FROM address WHERE address_id = LAST_INSERT_ID();`
	//SELECT FRom ${process.env.DBNAME}.addres.contact_id WHERE contact_id = LAST_INSERT_ID();
	//INSERT INTO PERSONAL
	
	  try {
    await db.beginTransaction();
    await db.query(sql1);
    await db.query(sql2);
	await db.query(sql3);
	await db.query(sql4);
    const results = await db.query(sql5);
    await db.commit();
    dbStatus(res, results);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
)

// router.put(`/update/resume/contact_info/:${pkText}`, isAuth, async (req, res) => {
//   const {
// 	name,
// 	phone,
// 	email,
//   } = req.body

//   const sql = `UPDATE ${
//     process.env.DBNAME
//   }.patient SET ${query.toString()} WHERE ${pkText}='${req.params[pkText]}'`;

//   // Apply update
//   try {
//     const results = await db.query(sql);
//     dbStatus(res, results);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });
	
export default router