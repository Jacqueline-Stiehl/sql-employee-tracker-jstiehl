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
  displayAllEmployees,
  displayAllRoles,
  displayAllEmployeesByDepartment,
  displayAllEmployeesByManager,
} = require("./lib/displays"); //displays all the departments
/*
  There are a lot of menu items presented to users in this app. The only real way you can manage them 
  is by creating a function to handle each one.

  I'm giving you a bit of starter code below.
*/

function start() {
  // const result = listAllDepartments();
  // console.log(result);

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
    .then(async (response) => {
      switch (response.option) {
        case "List all departments": //per Gary, do a case for each of the options
          const [rows] = await listAllDepartments();
          console.log(rows);

          displayAllDepartments(rows);
          start();
          break;
        //_________________________________________________________
        // listAllDepartments().then(([rows]) => {
        //   //per Gary, when you get an array of data from SQL, must be in brackets [rows]
        //   displayAllDepartments(rows);
        //   start();
        // });

        //I entered additional cases here:

        case "List all employees":
          const [rows2] = await listAllEmployees();
          console.log(rows2);

          displayAllEmployees(rows2);
          start();
          // listAllEmployees().then(([rows]) => {
          //   displayAllEmployees(rows);
          //   start();
          // });
          break;

        case "List all employees by department":
          const [rows3] = await listAllEmployeesByDepartment();
          console.log(rows3);

          displayAllEmployeesByDepartment(rows3);
          start();
          break;

        case "List all employees by manager":
          const [rows4] = await listAllEmployeesByManager();
          console.log(rows4);

          displayAllEmployeesByManager(rows4);
          start();
          break;
      }
    });

  //default:
  start();
}

start();
