const mysql = require("mysql");

const connection = require("./config/connection");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { validateInput, validateNumber } = require("./lib/validate");
const { response } = require("express");

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add employee",
        "Add role",
        "Update employee role",
        "View all departments",
        "View all employees",
        "View all roles",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add department":
          addDept();
          break;
        case "Add employee":
          addEmpl();
          break;
        case "Add role":
          addRole();
          break;
        case "Update employee role":
          updateEmplRole();
          break;
        case "View all departments":
          viewAllDepts();
          break;
        case "View all employees":
          viewallEmployees();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Quit":
          quit();
        default:
          quit();
      }
    });
}
//---- Add a new department ----//

function addDept() {
  inquirer
    .prompt({
      name: "addNewDept",
      type: "input",
      message: "Please enter the department name:",
      validate: validateInput,
    })
    .then((response) => {
      connection.query(
        `INSERT INTO department (name) VALUES ("${response.addNewDept}")`,
        (err) => {
          if (err) console.log(err.green);
        }
      );
      console.table(response);
      moreActions();
    });
}

//---- Add a new employee ----//

function addEmpl() {
  inquirer
    .prompt([
      {
        name: "emplFirstName",
        type: "input",
        message: "Enter employee's first name:",
        validate: validateInput,
      },
      {
        name: "emplLastName",
        type: "input",
        message: "Enter employee's last name:",
        validate: validateInput,
      },
      {
        name: "emplRole",
        type: "rawlist",
        message: "Select the employee's role:",
        choices: roles(),
      },
      {
        name: "emplManager",
        type: "list",
        message: "Select the eomployee's manager:",
        choices: managers(),
      },
    ])
    .then((response) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ("${response.emplFirstName}", "${response.emplLastName}", 
        (SELECT id FROM role WHERE title = "${response.emplRole}"), 
        (SELECT id AS managerId FROM employee AS mainTable WHERE first_name = "${response.emplManager}"));`,
        (err) => {
          if (err) console.log(err);
        }
      );
      console.table(response);
      moreActions();
    });
}

//---- Add a new role ----//

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the role name:",
        validate: validateInput,
      },
      {
        name: "salary",
        type: "input",
        message:
          "Enter the salary for the role (without commas or special characters):",
        validate: validateNumber,
      },
      {
        name: "department",
        type: "list",
        message: "Select the department the role belongs to:",
        choices: departments(),
      },
    ])
    .then((response) => {
      connection.query(
        `INSERT INTO role (title, salary, department_id) 
    VALUES ("${response.title}", "${response.salary}", 
    (SELECT id FROM department WHERE name = "${response.department}"));`,
        (err) => {
          if (err) console.log(err);
        }
      );
      console.table(response);
      moreActions();
    });
}

//---- Update an employee's role ----//

function updateEmplRole() {
  inquirer
    .prompt([
      {
        name: "emplNewRole",
        type: "input",
        message: "Enter the employee's new role id:",
        validate: validateNumber,
      },
      {
        name: "updatedEmpl",
        type: "input",
        message: "Enter the id for the employee:",
        validate: validateNumber,
      },
    ])
    .then((response) => {
      connection.query(
        `UPDATE employee SET role_id = ${response.emplNewRole} WHERE id = ${response.updatedEmpl}`,
        (err, res) => {
          if (err) console.log(err);
        }
      );
      console.table(response);
      moreActions();
    });
}

//---- View all departments ----//

function viewAllDepts() {
  connection.query(
    `SELECT department.id, name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id GROUP BY department.id ORDER BY department.id ASC`,
    (err, res) => {
      if (err) console.log(err);
      console.table(res);
      moreActions();
    }
  );
}

//---- View all employees ----//

function viewallEmployees() {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager, role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC`,
    (err, res) => {
      if (err) console.log(err);
      console.table(res);
      moreActions();
    }
  );
}

//---- View all roles ----//

function viewAllRoles() {
  connection.query(
    `SELECT role.id, role.title, department.name AS department, salary FROM role LEFT JOIN department ON department.id = role.department_id ORDER BY role.id ASC, role.title ASC`,
    (err, res) => {
      if (err) console.log(err);
      console.table(res);
      moreActions();
    }
  );
}

//---- Prompt to confirm user's next action ----//

function moreActions() {
  inquirer
    .prompt([
      {
        name: "continue",
        type: "confirm",
        message: "Would you like to continue?",
      },
    ])
    .then((response) => {
      if (response.continue) {
        init();
      } else {
        quit();
      }
    });
}

//---- An array of roles available to choose from when adding a new employee ----//

let roleArray = [];
function roles() {
  connection.query(`SELECT * FROM role`, function (err, res) {
    if (err) console.log(err);
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });

  return roleArray;
}

//---- An array of employees with a NULL manager_id value. A NULL manager_id value indicates a manager ----//

let managerArray = [];
function managers() {
  connection.query(
    `SELECT first_name, last_name FROM employee WHERE manager_id IS NULL`,
    function (err, res) {
      if (err) console.log(err);
      for (let i = 0; i < res.length; i++) {
        managerArray.push(`${res[i].first_name}`);
      }
    }
  );

  return managerArray;
}

//---- An array of all available departments ----//

let deptArray = [];
function departments() {
  connection.query(`SELECT * FROM department`, function (err, res) {
    if (err) console.log(err);
    for (let i = 0; i < res.length; i++) {
      deptArray.push(res[i].name);
    }
  });

  return deptArray;
}

// --- Quit function ----//

function quit() {
  console.log("Process ended, goodbye.");
  process.exit();
}

init();
