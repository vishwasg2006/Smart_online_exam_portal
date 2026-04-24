const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "DBMS",
  port:3306
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed");
    console.log("error code:",err.code);
    console.log("error message:",err.message);
    return;
  } 
    console.log("✅ MySQL Connected");
  
});

module.exports = db;