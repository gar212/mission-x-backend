const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "light008",
    database: "BlogPosts"
});

module.exports = db;