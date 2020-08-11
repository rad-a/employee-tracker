const mysql = require('mysql');
const inquirer = require('inquirer');
require("dotenv").config();

const db_pw = process.env.DB_PASSWORD;

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: db_pw || '',
  database: 'employees_DB'
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;

  console.log(`Connected to the database. ID: ${connection.threadId}`);
//   start();
});


module.exports = connection;