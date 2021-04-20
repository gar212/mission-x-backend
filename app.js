const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const mysql = require('mysql2');

const PORT = 5000;
const app = express();
app.use(cors());


const yourQuery = `SELECT * FROM User`;

// A simple query
const runDBQuery = (yourQuery) => {
  return db.promise().query(yourQuery);
};

// A helper method to convert the DB query result into JSON format.
const parseResultToJSON = (resultRowsArray) =>
  resultRowsArray.map((mysqlObj) => Object.assign({}, mysqlObj));

// When a API request is made to localhost:3000, the DB query is executed
app.get("/", (req, res) => {
  runDBQuery(yourQuery)
    .then((queryResult, fields) => {
      const [rows] = queryResult;
      const jsonResults = parseResultToJSON(rows);
      console.log("Sending response for GET", jsonResults);
      // Sends the response if query was successful.
      res.send(jsonResults);
    })
    .catch((error) => {
      console.log(error);
      // Sends an error if the query returned an error.
      res.status(500).send(error);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})