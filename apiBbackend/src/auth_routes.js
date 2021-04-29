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



// async function readItems(path) {
//     let json = await readFile(path)
//     return JSON.parse(json)
    
// }

// async function writeAll(item, pathTo) {
//     const json = JSON.stringify(item, null, 2)
//     return writeFile(pathTo, json)
// }
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
    req.body.admin_id = uuidv4()
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const {
        name,
        phone,
        email,

        admin_id,
        password
    } = req.body
    
    //users.push(req.body)
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
   
    //return res.status(201).json(req.body)
})

//Route to log a registered user in to create a JWT (JSON Web Token) token:


router.post('/auth', async (req, res, error) => {
    
    const users = await db.query(`SELECT a.password, a.contact_id, ci.email FROM ${process.env.DBNAME}.admin a INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( a.contact_id = ci.contact_id)`)
    
    const emailFound = users.find(searchObj => searchObj.email == req.body.email)// I used email to find users because request body doesnt have ID originally
        if (!emailFound){
            return res.status(403).json("incorrect email provided")
        }
    const pswdValid = bcrypt.compareSync(req.body.password, emailFound.password)//Used sync
    if (!pswdValid){
        return res.status(403).json("incorrect credentials provided")
        }
        
    const user = ({
    email : req.body.email,
    password : req.body.password
    })
    
    const token = jwt.sign( user, process.env.TOKEN_SECRET, {
        expiresIn: 9999
        }
    )
    
    return res.status(200).send({ token: token })
})

//Route to get a listing of all submissions when given a valid JWT is provided


router.get('/contact_form/entries', authToken, async (req, res) => {
    //const entries = await readItems(entrPath)
    const entries = await db.query(`SELECT cfi.input_id, cfi.time_stamp, cfi.content, ci.name, ci.phone, ci.email FROM ${process.env.DBNAME}.contact_form_input cfi INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( cfi.contact_id = ci.contact_id  )    `)
    res.status(200).send(entries)
    }
)

//Route to get a specific submission when given an ID alongside a valid JWT:

router.get('/contact_form/entries/:id', authToken, async (req, res) => {
    const entries = await readItems(entrPath)
    if (!entries){
        return {message: `no entries found`}
    }
    const idFound = entries.find(searchObj => searchObj.id == req.params.id)
    if (!idFound){
        return res.status(400).json({message: `entry ${req.params.id} not found`})
    }
    return res.status(200).send(idFound)
    }
)
export default router