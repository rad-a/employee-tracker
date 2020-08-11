const connection = require("config/connection");
const inquirer = require("inqirer");
const mysql = require("mysql");

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
        "Remove employee",
        "Update employee role",
        "View all departments",
        "View all employees",
        "View all roles",
        "Exit",
        "View all employees by manager",
        "Update employee manager",
        "Delete department",
        "Delete role",
        "Delete employee",
        "View department budget",
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
        case "Exit":
          exit();
        case "View all employees by manager":
          viewEmplByMngr();
          break;
        case "Update employee manager":
          updateEmplMngr();
          break;
        case "Delete department":
          deleteDept();
          break;
        case "Delete role":
          deleteRole();
          break;
        case "Delete employee":
          deleteEmpl();
          break;
        case "View department budget":
          viewDeptBudget();
      }
    });
}

function addDept() {}

function addEmpl() {}

function addRole() {}

function removeEmpl() {}

function updateEmplRole() {}

function viewAllDepts() {}

function viewallEmployees() {}

function viewAllRoles() {}

function exit() {}

//===Optional functions===

function viewEmplByMngr() {}

function updateEmplMngr() {}

function deleteDept() {}

function deleteRole() {}

function deleteEmpl() {}

function viewDeptBudget() {}



init();