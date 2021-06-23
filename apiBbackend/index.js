
import express from 'express'
import routes from './src/auth_routes.js'
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config()
// try new
import { db } from './database/connection.js'

const app = express();
const port = process.env.ENV_PORT
//ENV_PORT

app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use((req, res, next) => {
    return res.status(404).send({
    status: 404,
    message: "not found"
    })
    next(error)
})

// error handler middleware
app.use((error, req, res, next) => {
    return res.status(error.status || 500).send({
        error: {
        status: error.status || 500,
        message: "Internal Server Error",
        },
    });
});

app.get("/db", (req, res) => { 
    db.query("SELECT * FROM portfolio", function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    });
  });

export default app.listen(port, function () {
  console.log(`API server ready on http://localhost:${port}`);
});