const express = require('express');
const db = require('./config/db');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;
const app = express();
app.use(cors());

let sql = `Select * from User WHERE UserID = 4`;

// A helper method to convert the DB query result into JSON format.
const parseResultToJSON = (resultRowsArray) =>
  resultRowsArray.map((mysqlObj) => Object.assign({}, mysqlObj));

app.get("/", (req,res) => {
  db.query(sql, (err, result)=> {
    if (err){
      console.log(err)
    }
    res.send(result);
    // res.send(parseResultToJSON(result));
  })
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 