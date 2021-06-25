FS1040 course project

Project scope:


Development goals:

Create database ERD and IFD.
Create MySQL schema which integrates contact us form entries storing, authentication details of the admin, resume components and portfolio links. See attached .pdf  and .sql files in repository /documents folder for details apiBbackend/database/fs1030individualDBschema.pdf
Insert dummy data into DB for functional testing.
Insert resume and portfolio data.
Connect database to API.
Setup authentication of admin and "contact us" handling using existing API.
Setup resume CRUD in API.
Setup resume pages (front end).
Setup portfolio CRUD in API.
Setup portfolio pages (front end).

How to run:
Install dependencies for apiBbackend and course-react-app separately

Connect MySQL database using provided below details.

Check .env file in apiBbackend root.
Should be 

PORT=3008
TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509
REACT_APP_SERVERPORT=3000
PRIVATEKEY="anykey"
DBHOST= "localhost"
DBUSER= "nodeclient"
DBPASSWORD= "123456"
DBNAME= "FS1030IndividualProject"

To start use npm start from root (starts both React and API)

To access admin page go to /login page (manually, no link)

Login: admin@admin.com, adminadmin

Entries page shows messages from contact us. 

Specific message could be opened /login/:id

Resume editing:
/Resume_crud_1
/Resume_skill/:id
Work in progress

MySQL queries:

CRUD implemented, but for the future use delete function would be replaced with an additional column "active" to keep the records and use relative version of the data.

Contact us:
apiBbackend/src/auth_routes.js
/
/Route to create an entry when the user submits their contact form:

await db.beginTransaction();
        await db.query(`INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}')`);
        const results = await db.query(`INSERT INTO ${process.env.DBNAME}.contact_form_input (input_id, content, contact_id) VALUES ( '${input_id}', '${content}', LAST_INSERT_ID());`)
        await db.commit();

//Route to create a user

const emailInUse = await db.query(`SELECT ci.email FROM ${process.env.DBNAME}.admin a INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( a.contact_id = ci.contact_id  )   WHERE ci.email = '${req.body.email}';`)

await db.query(`INSERT INTO ${process.env.DBNAME}.contact_info ( name, phone, email ) VALUES ( '${name}', '${phone}', '${email}')`);
        const results = await db.query(`INSERT INTO ${process.env.DBNAME}.admin (admin_id, password, contact_id) VALUES ( '${admin_id}', '${password}', LAST_INSERT_ID());`)

//Route to get a listing of all submissions when given a valid JWT is provided

await db.query(`SELECT cfi.input_id, cfi.time_stamp, cfi.content, ci.name, ci.phone, ci.email FROM ${process.env.DBNAME}.contact_form_input cfi INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( cfi.contact_id = ci.contact_id  )    `)

//Route to get a specific submission when given an ID alongside a valid JWT:

await db.query(`SELECT cfi.input_id, cfi.time_stamp, cfi.content, ci.name, ci.phone, ci.email FROM ${process.env.DBNAME}.contact_form_input cfi INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( cfi.contact_id = ci.contact_id  ) WHERE cfi.input_id = '${req.params.id}' `)
          

Admin:

//Route to login registered user to create a JWT (JSON Web Token) token:
await db.query(`SELECT a.password, a.contact_id, ci.email FROM ${process.env.DBNAME}.admin a INNER JOIN ${process.env.DBNAME}.contact_info ci ON ( a.contact_id = ci.contact_id) WHERE ci.email = '${request.email}';`)


Portfolio:

//Portfolio GET
await db.query(`SELECT p.link, p.description FROM ${process.env.DBNAME}.portfoliio p GROUP BY p.link, p.description `)


Resume:
//Resume GET
 
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

//personal info resume POST

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


//resume education POST

 
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

//Resume skills POST

await db.query(`INSERT INTO ${process.env.DBNAME}.skill (skill) VALUES ('${skill}');`)

//Resume skills PUT

await db.query(`UPDATE ${process.env.DBNAME}.skill SET skill = "${skill}" WHERE skill_id = ${req.params.id}`)
      await db.commit()

//Resume skills DELETE
await db.query(`DELETE FROM ${process.env.DBNAME}.skill WHERE skill_id = ${req.params.id}`)

//Resume highlights_qualifications POST

await db.query(`INSERT INTO ${process.env.DBNAME}.highlights_qualifications (qualification) VALUES ('${qualification}');`)

//Resume highlights_qualifications PUT

await db.query(`UPDATE ${process.env.DBNAME}.highlights_qualifications SET qualification = "${qualification}" WHERE qualification_id = ${req.params.id}`)
      await db.commit()

//Resume highlights_qualifications DELETE
await db.query(`DELETE FROM ${process.env.DBNAME}.highlights_qualifications WHERE qualification_id = ${req.params.id}`)
      await db.commit()

