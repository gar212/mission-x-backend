const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createConnection({
    host: "SG-missionX-4143-mysql-master.servers.mongodirector.com",
    database: "StudentDB",
    user: "Gar",
    password: "Gar123456!",
     ssl: {
   ca: fs.readFileSync(
   'cert.pem',
   ),
 },
});

module.exports = db;