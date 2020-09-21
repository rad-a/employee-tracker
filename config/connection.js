const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const db_pw = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: db_pw || "",
  database: db_name,
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) console.log(err);

  console.log(`Connected to the database. ID: ${connection.threadId}`);
});

module.exports = connection;
