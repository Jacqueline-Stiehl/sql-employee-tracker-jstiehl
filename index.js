const inquirer = require("inquirer");
const connection = require("./config/connection");
const {
  listAllDepartments,
  listAllEmployees,
  listAllEmployeesByDepartment,
  listAllEmployeesByManager,
} = require("./lib/queries"); //lists all departments
const {
  displayAllDepartments,
  displayAllEmployeesByDepartment,
  displayAllEmployeesByManager,
} = require("./lib/displays"); //displays all the departments
/*
  There are a lot of menu items presented to users in this app. The only real way you can manage them 
  is by creating a function to handle each one.

  I'm giving you a bit of starter code below.
*/

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an item from the list below:",
        name: "option",
        choices: [
          "List all departments",
          "List all employees",
          "List all employees by department",
          "List all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
        ],
      },
    ])
    .then((response) => {
      switch (response.option) {
        case "List all departments": //per Gary, do a case for each of the options
          listAllDepartments().then(([rows]) => {
            //per Gary, when you get an array of data from SQL, must be in brackets [rows]
            displayAllDepartments(rows);
            start();
          });
          break;
        //I entered additional cases here:

        case "List all employees":
          listAllEmployees().then(([rows]) => {
            displayAllEmployees(rows);
            start();
          });
          break;

        case "List all employees by department":
          listAllEmployeesByDepartment().then(([rows]) => {
            displayAllEmployeesByDepartment(rows);
            start();
          });
          break;

        case "List all employees by manager":
          listAllEmployeesByManager().then(([rows]) => {
            displayAllEmployeesByManager(rows);
            start();
          });
          break;

        default:
          start();
      }
    });
}

start();
