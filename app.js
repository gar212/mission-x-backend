const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const mysql = require("mysql2");

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

app.get("/progresstracker", (req, res) => {
  const yourQuery = `Select UserID, group_concat(ProgressHistory.Project_ProjectID) as ProjectDone, FirstName, LastName from User 
Left join ProgressHistory on (User.UserID = ProgressHistory.User_UserID) WHERE User.Role = 'student'
Group by 1;`;
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

/*TESTING */
app.get("/projectbuilder", (req, res) => {
  const yourQuery = `SELECT * FROM StudentDB.Project`;
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

app.get("/helprequests", (req, res) => {
  const yourQuery = `Select UserID, FirstSelect UserID, FirstName, LastName, ProfilePic, HelpRequest.DateCreated from User left join HelpRequest on (User.UserID = HelpRequest.User_UserID) WHERE DateCreated is NOT NULL;
  Name, LastName, HelpRequest.DateCreated from User left join HelpRequest on (User.UserID = HelpRequest.User_UserID) WHERE DateCreated is NOT NULL`;
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
    app.listen(process.env.PORT || PORT, () =>
      console.log(`Server running on port ${PORT}!`)
    );
  } catch (e) {
    console.error(e);
  }
};

startServer();