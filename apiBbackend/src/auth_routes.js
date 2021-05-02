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

//Route to create a user

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

//Portfolio GET
router.get('/portfolio', async (req, res) => {
    const entries = await db.query(`SELECT p.link, p.description FROM ${process.env.DBNAME}.portfoliio p GROUP BY p.link, p.description `)
    res.status(200).send(entries)
     }
)


//Resume GET
router.get('/resume', async (req, res) => {
    const resume = {}



    resume.personal_info = await db.query(`SELECT a.street_address, a.city, a.province, a.country, ci.name, ci.phone, ci.email
    FROM ${process.env.DBNAME}.personal_info pi 
        INNER JOIN ${process.env.DBNAME}.address a ON ( pi.address_id = a.address_id  ) INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( pi.contact_id = ci.contact_id  ) AND ci.contact_id = 2 GROUP BY a.street_address, a.city, a.province, a.country, ci.name, ci.phone, ci.email `)
    resume.skills = await db.query(`SELECT skill FROM ${process.env.DBNAME}.skill`)
    resume.qualifications = await db.query(`SELECT qualification FROM ${process.env.DBNAME}.highlights_qualifications`)
    resume.work_experience = await db.query(`SELECT we.position, we.task, dt.start_date, dt.finish_date, a.country, a.province, a.city, ci.name
    FROM ${process.env.DBNAME}.work_experience we INNER JOIN ${process.env.DBNAME}.date_to dt ON ( we.date_to_id = dt.date_to_id  ) INNER JOIN ${process.env.DBNAME}.address a ON ( we.address_id = a.address_id  ) INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( we.contact_id = ci.contact_id  ) AND we. experience_id <= 3 GROUP BY we.position, we.task, dt.start_date, dt.finish_date, a.country, a.province, a.city, ci.name`)
    resume.education = await db.query(`SELECT e.education_title, dt.start_date, dt.finish_date, ci.name, a.country, a.province, a.city
    FROM ${process.env.DBNAME}.education e INNER JOIN ${process.env.DBNAME}.date_to dt ON ( e.date_to_id = dt.date_to_id  ) INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( e.contact_id = ci.contact_id  ) INNER JOIN ${process.env.DBNAME}.address a ON ( e.address_id = a.address_id  ) AND e.education_id <= 2 GROUP BY e.education_title, dt.start_date, dt.finish_date, ci.name, a.country, a.province, a.city`)
    resume.training = await db.query(`SELECT e.traning_title, dt.start_date, dt.finish_date, ci.name, a.country, a.province, a.city
    FROM ${process.env.DBNAME}.education e INNER JOIN ${process.env.DBNAME}.date_to dt ON ( e.date_to_id = dt.date_to_id  ) INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( e.contact_id = ci.contact_id  ) INNER JOIN ${process.env.DBNAME}.address a ON ( e.address_id = a.address_id  ) AND e.education_id >= 3 GROUP BY e.traning_title, dt.start_date, dt.finish_date, ci.name, a.country, a.province, a.city`)
    
        res.status(200).send(resume)
     }
)

//personal info resume POST

router.post("/resume/personal", async (req, res) => {
    // Get payload
    const {
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

//resume work experience POST


  router.post("/resume/work_experience", async (req, res) => {
    // Get payload
    const {
  //date_to
  start_date,
  finish_date,
  
  //contact_info
  name,
  phone,
  email,
  
  //address
  country,
  province,
  city,
  street_address,
  
  //work_experience
  position,
  task
  } = req.body
  
  const sql5 = `INSERT INTO ${process.env.DBNAME}.date_to (start_date, finish_date) VALUES ('${start_date}', '${finish_date}');`
  const sql6 = `SET @date_to_date_to_id = LAST_INSERT_ID();`
  const sql7 = `INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}');`
  const sql8 = `SET @contact_info_contact_id = LAST_INSERT_ID();`
  const sql9 = `INSERT INTO ${process.env.DBNAME}.address ( country, province, city, street_address ) VALUES ( '${country}', '${province}', '${city}', '${street_address}' );`
  const sql10 = `INSERT INTO ${process.env.DBNAME}.work_experience (contact_id, address_id, date_to_id, position, task) VALUES (@contact_info_contact_id,  LAST_INSERT_ID(), @date_to_date_to_id, '${position}', '${task}');`
  
  
   try {
      await db.beginTransaction();
      await db.query(sql5);
      await db.query(sql6);
      await db.query(sql7);
      await db.query(sql8);
      await db.query(sql9);
      const results = await db.query(sql10);
      await db.commit();
      dbStatus(res, results);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  )

//resume education POST

  router.post("/resume/education", async (req, res) => {
    // Get payload
    const {
  //date_to
  start_date,
  finish_date,
  
  //contact_info
  name,
  phone,
  email,

  //address
  country,
  province,
  city,
  street_address,
  
  //education
  education_title,
  traning_title
  
   } = req.body
  
  const sql11 = `INSERT INTO ${process.env.DBNAME}.date_to (start_date, finish_date) VALUES ('${start_date}', '${finish_date}');`
  const sql12 = `SET @date_to_date_to_id = LAST_INSERT_ID();`
  const sql13 = `INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}' );`
  const sql14 = `SET @contact_info_id = LAST_INSERT_ID();`
  const sql15 = `INSERT INTO ${process.env.DBNAME}.address ( country, province, city, street_address ) VALUES ( '${country}', '${province}', '${city}', '${street_address}' );`
  const sql16 = `INSERT INTO ${process.env.DBNAME}.education ( contact_id, address_id, date_to_id, education_title, traning_title ) VALUES (@contact_info_id,  LAST_INSERT_ID(), @date_to_date_to_id, '${education_title}', '${traning_title}');`
  
  
   try {
      await db.beginTransaction();
      await db.query(sql11);
      await db.query(sql12);
      await db.query(sql13);
      await db.query(sql14);
      await db.query(sql15);
      const results = await db.query(sql16);
      await db.commit();
      dbStatus(res, results);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  )

  //Resume skills POST
  router.post("/resume/skill", async (req, res) => {
  // Get payload
  const {
//skills
skill
  } = req.body

try{
    const result = await db.query(`INSERT INTO ${process.env.DBNAME}.skill (skill) VALUES ('${skill}');`)
    await db.commit();
    dbStatus(res, result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
)

//Resume skills PUT
router.put("/resume/skill/:id", async (req, res) => {
    // Get payload
    const {
  //skills
  skill
    } = req.body
  
  try{
      const result = await db.query(`UPDATE ${process.env.DBNAME}.skill SET skill = "${skill}" WHERE skill_id = ${req.params.id}`)
      await db.commit()
      dbStatus(res, result)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
  )

//Resume skills DELETE
  router.delete("/resume/skill/:id", async (req, res) => {
    try{
        const result = await db.query(`DELETE FROM ${process.env.DBNAME}.skill WHERE skill_id = ${req.params.id}`)
        await db.commit()
        dbStatus(res, result)
      } catch (error) {
        console.log(error)
        return res.status(500).json(error)
      }
    }
    )

//Resume highlights_qualifications POST
    router.post("/resume/highlights_qualifications", async (req, res) => {
  // Get payload
  const {
//skills
qualification
  } = req.body

try{ 
    const result = await db.query(`INSERT INTO ${process.env.DBNAME}.highlights_qualifications (qualification) VALUES ('${qualification}');`)
    await db.commit();
    dbStatus(res, result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
)

//Resume highlights_qualifications PUT
router.put("/resume/highlights_qualifications/:id", async (req, res) => {
    // Get payload
    const {
  //qualifications
qualification
    } = req.body
  
  try{
      const result = await db.query(`UPDATE ${process.env.DBNAME}.highlights_qualifications SET qualification = "${qualification}" WHERE qualification_id = ${req.params.id}`)
      await db.commit()
      dbStatus(res, result)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
  )

  //Resume highlights_qualifications DELETE
router.delete("/resume/highlights_qualifications/:id", async (req, res) => {
  try{
      const result = await db.query(`DELETE FROM ${process.env.DBNAME}.highlights_qualifications WHERE qualification_id = ${req.params.id}`)
      await db.commit()
      dbStatus(res, result)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
  )

export default router