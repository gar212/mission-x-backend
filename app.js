const express = require("express");
const db = require("./config/db");
const mysql = require("mysql2");

const PORT = 5000;
const app = express();

app.use(express.json());
// A simple query
const runDBQuery = (yourQuery) => {
  return db.promise().query(yourQuery);
};

// A helper method to convert the DB query result into JSON format.
const parseResultToJSON = (resultRowsArray) =>
  resultRowsArray.map((mysqlObj) => Object.assign({}, mysqlObj));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const yourQuery =
    "SELECT Password FROM StudentDB.User where Email = '" + email   + "';";
  runDBQuery(yourQuery)
    .then((queryResult, fields) => {
      const [rows] = queryResult;
      const jsonResults = parseResultToJSON(rows);
      console.log(jsonResults)
      if (jsonResults.length === 0) {
        res
          .status(401)
          .send("Could not find a user with the provided email id");
      } else {
        if (password == jsonResults[0].Password) {
          res.status(200).send("Successfully logged in user!");
        } else {
          res.status(401).send("Invalid password.");
        }
      } // Sends the response if query was successful.
    })
    .catch((error) => {
      console.log(error);
      // Sends an error if the query returned an error.
      res.status(500).send(error);
    });
});
app.get("/progresstracker", (req, res) => {
  const yourQuery =
    "SELECT Password FROM StudentDB.User where Email = 'aiden.andrews@mrhq.com';";
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
  const yourQuery = `SELECT UserID, FirstName, LastName, Email, Password, School, ProfilePic, TeacherID, DateOfBirth, date_format(DateOfBirth, '%d-%M-%Y') as 'dob', ContactNumber, Email, Role FROM User WHERE Role = 'student'`;
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
  const yourQuery = `Select UserID, FirstName, LastName, ProfilePic, date_format(DateCreated, '%Y-%m-%d') as 'date', date_format(DateCreated, '%H:%i:%s') as 'time', HelpRequest.DateCreated from User left join HelpRequest on (User.UserID = HelpRequest.User_UserID) WHERE DateCreated is NOT NULL;`;
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

app.get("/projectsubmissions", (req, res) => {
  const yourQuery = `SELECT UserID, FirstName, LastName, ProfilePic, date_format(DateSubmitted, '%Y-%m-%d') as 'date', date_format(DateSubmitted, '%H:%i:%s') as 'time', ProgressHistory.DateSubmitted, Project.Image 
  from User 
  left join HelpRequest on (User.UserID = HelpRequest.User_UserID)
  left join  ProgressHistory on (User.UserID = ProgressHistory.User_UserID)
  left join Project on (Project.ProjectID = ProgressHistory.Project_ProjectID)
  WHERE DateCreated is NOT NULL;`;
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
