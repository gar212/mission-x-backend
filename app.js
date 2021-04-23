const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const mysql = require('mysql2');

const PORT = 5000;
const app = express();
app.use(cors());

// A simple query
const runDBQuery = (yourQuery) => {
  return db.promise().query(yourQuery);
};

// A helper method to convert the DB query result into JSON format.
const parseResultToJSON = (resultRowsArray) =>
  resultRowsArray.map((mysqlObj) => Object.assign({}, mysqlObj));


const getProfilePic = async (req, res) => {
  const { id } = req.params;
  const queryResult = await getUserProfilePic(id);
  const jsonResult = resultToJSON(queryResult);

  const { image, mimeType } = jsonResult[0];
  const encoding = 'base64';
  // Data URIs - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  // Structure of the URI || data:[<mime type>][;charset=<charset>][;base64],<encoded data>
  // Example              || data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABNwAAAKmCAYAA...
  const uri = `data:${mimeType};${encoding},${image}`;
  res.status(200).send({ dataURI: uri });
};


app.get("/progresstracker", (req, res) => {
  const yourQuery = `SELECT * FROM User WHERE Role = 'student' `;
  runDBQuery(yourQuery)
    .then((queryResult, fields) => {
      const [rows] = queryResult;
      const jsonResults = parseResultToJSON(rows);
      // Sends the response if query was successful.
      res.send(jsonResults);
    })
    .catch((error) => {
      console.log(error);
      // Sends an error if the query returned an error.
      res.status(500).send(error);
    });
});

app.get("/studentprofiles", (req, res) => {
  const yourQuery = `SELECT * FROM User WHERE Role = 'student' `;
  runDBQuery(yourQuery)
    .then((queryResult, fields) => {
      const [rows] = queryResult;
      const jsonResults = parseResultToJSON(rows);
      // Sends the response if query was successful.
      res.send(jsonResults);
    })
    .catch((error) => {
      console.log(error);
      // Sends an error if the query returned an error.
      res.status(500).send(error);
    });
});

// Starting the server after connecting to DB
const startServer = async () => {
  try {
    app.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}!`));
  } catch (e) {
    console.error(e);
  }
};

startServer();