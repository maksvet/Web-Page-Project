import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import util from 'util'
const router = express.Router()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from '.././database/connection.js'
import { badRequest, objProps, objUserProps, message, validateItem, validateUser, validateString,
    validateEmail, validatePhone, validatePswd, returnMessage, authToken
} from './helpFns.js'
import dotenv from "dotenv";
dotenv.config();

//kept for developing only
const dbStatus = (res, results) => {
    if (results.affectedRows !== 0)
      return res.status(200).json(`Database successfully updated!`);
    return res.status(400).json(`Error: database not updated!!`);
  };
    

//Route to create an entry when the user submits their contact form:
router.post('/contact_form/entries', validateItem, validateString, validateEmail, validatePhone, returnMessage, async (req, res) => {
    
    
    req.body.input_id = uuidv4()
    const {
        name,
        phone,
        email,

        input_id,
        content
    } = req.body

    try {
        await db.beginTransaction();
        await db.query(`INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}')`);
        const results = await db.query(`INSERT INTO ${process.env.DBNAME}.contact_form_input (input_id, content, contact_id) VALUES ( '${input_id}', '${content}', LAST_INSERT_ID());`)
        await db.commit();
        dbStatus(res, results);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }})

//Route to create a user, saving users in array for now

router.post('/users', validateUser, validateString, validatePswd, validateEmail, returnMessage, async (req, res) => {
    const emailInUse = await db.query(`SELECT ci.email FROM ${process.env.DBNAME}.admin a INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( a.contact_id = ci.contact_id  )   WHERE ci.email = '${req.body.email}';`)
    if (emailInUse) {
        return res.status(403).json("Email address already in use")
    }
    req.body.admin_id = uuidv4()
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const {
        name,
        phone,
        email,

        admin_id,
        password
    } = req.body
    
   
    try {
        await db.beginTransaction();
        await db.query(`INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}')`);
        const results = await db.query(`INSERT INTO ${process.env.DBNAME}.admin (admin_id, password, contact_id) VALUES ( '${admin_id}', '${password}', LAST_INSERT_ID());`)
        await db.commit();
        dbStatus(res, results);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
   
    
})

//Route to login registered user to create a JWT (JSON Web Token) token:


router.post('/auth', async (req, res, error) => {
   
    const request = await req.body
    const users = await db.query(`SELECT a.password, a.contact_id, ci.email FROM ${process.env.DBNAME}.admin a INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( a.contact_id = ci.contact_id) WHERE ci.email = '${request.email}';`)
        
    if (!users){
            return res.status(403).json("incorrect email provided")
        }
    const pswdValid = await bcrypt.compare(request.password, users[0].password)
    if (!pswdValid){
        return res.status(403).json("incorrect credentials provided")
        }
        
    const user = ({
    email : request.email,
    password : users[0].password
    })
    
    const token = jwt.sign( user, process.env.TOKEN_SECRET, {
        expiresIn: 9999
        }
    )
    
    return res.status(200).send({ token: token })
})

//Route to get a listing of all submissions when given a valid JWT is provided


router.get('/contact_form/entries', authToken, async (req, res) => {
    const entries = await db.query(`SELECT cfi.input_id, cfi.time_stamp, cfi.content, ci.name, ci.phone, ci.email FROM ${process.env.DBNAME}.contact_form_input cfi INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( cfi.contact_id = ci.contact_id  )    `)
    res.status(200).send(entries)
    }
)



//Route to get a specific submission when given an ID alongside a valid JWT:

router.get('/contact_form/entries/:id', authToken, async (req, res) => {
    const entries = await db.query(`SELECT cfi.input_id, cfi.time_stamp, cfi.content, ci.name, ci.phone, ci.email FROM ${process.env.DBNAME}.contact_form_input cfi INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( cfi.contact_id = ci.contact_id  ) WHERE cfi.input_id = '${req.params.id}' `)
    res.status(200).send(entries)
    if (!entries){
        return {message: `no entries found`}
    }
     }
)

router.post("/resume/personal", async (req, res) => {
    // Get payload
    const {
      //skill
      //skill,
      
      //highlights_qualifications
      //qualification,
      
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
  
  const sql1 = `INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}' );`
  const sql2 = `SET @last_id_contact_info = LAST_INSERT_ID();`
  const sql3 = `INSERT INTO ${process.env.DBNAME}.address ( country, province, city, street_address ) VALUES ( '${country}', '${province}', '${city}', '${street_address}' );`
  const sql4 = `INSERT INTO ${process.env.DBNAME}.personal_info ( contact_id, address_id ) VALUES ( @last_id_contact_info, LAST_INSERT_ID() );`
  
//   const sql2 = `INSERT INTO ${process.env.DBNAME}.highlights_qualifications (qualification) VALUES ('${qualification}');`
      
//   const sql3 = `INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}');`
      
//   const sql4 = `INSERT INTO ${process.env.DBNAME}.address
//       ( country, province, city, street_address, contact_id ) VALUES ( '${country}', '${province}', '${city}', '${street_address}', LAST_INSERT_ID()); )`
      
//   const sql5 = `INSERT INTO ${process.env.DBNAME}.personal_info SELECT (contact_id, address_id) FROM address WHERE address_id = LAST_INSERT_ID();`
//       //SELECT FRom ${process.env.DBNAME}.addres.contact_id WHERE contact_id = LAST_INSERT_ID();
      //INSERT INTO PERSONAL
      
        try {
      await db.beginTransaction();
         await db.query(sql1);
      await db.query(sql2);
      await db.query(sql3);
      const results = await db.query(sql4);
      await db.commit();
      dbStatus(res, results);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  )


export default router