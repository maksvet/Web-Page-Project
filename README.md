FS1040 course project

Project scope:
Utilizing GCP, students will deploy their latest iteration of their program project within the public cloud. This project must take advantage of a compute service (Cloud Run), as well as one of the cloud hosted databases (Cloud SQL). If you do not have a working program project, please see instructor.

Development goals:
Create an appropriate Dockerfile for the backend of the project
Create an appropriate Docker Compose setup 
Setup GCP using the services to launch the application and deploy a working example.
Update README.md file with instructions 
Create a merge request (or pull request) and assign to instructor.
Create a static website for the frontend of the project
Assign a custom domain for static website, and update your README to include this new domain name.

How to run:
Install dependencies for apiBbackend and course-react-app separately



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


