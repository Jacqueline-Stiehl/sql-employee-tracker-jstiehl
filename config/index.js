const inquirer = require("inquirer");
const connection = require("./config/connection");
const { listAllDepartments } = require("./lib/queries"); //lists all departments
const { displayAllDepartments } = require("./lib/displays"); //displays all the departments
/*
  There are a lot of menu items presented to users in this app. The only real way you cam manage them 
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
        choices: ["List All Departments", "Option 2", "Option 3"],
      },
    ])
    .then((response) => {
      switch (response.option) {
        case "List All Departments": //per Gary, do a case for each of the options
          listAllDepartments().then(([rows]) => {
            //per Gary, when you get an array of data from SQL, must be in brackets [rows]
            displayAllDepartments(rows);
            start();
          });

          break;

        default:
          start();
      }
    });
}

start();
