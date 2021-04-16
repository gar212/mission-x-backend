const express = require('express');
const db = require('./config/db');
const mysql = require('mysql2');
const cors = require('cors');

const PORT = 5000;
const app = express();
app.use(cors());

const runDBQuery = (sqlQuery) => {
  const sqlQuery = `Select * from User WHERE UserID = 1`;
  return db.promise().query(sqlQuery);
};

app.get("/", (req, res) => {
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  })
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});