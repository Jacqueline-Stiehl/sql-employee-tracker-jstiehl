//per Gary, this file does all of our output to the screen
const inquirer = require("inquirer");
const connection = require("../config/connection");

function displayAllDepartments(data) {
  //Gary provided this one
  console.log("\n");
  console.table(data);
}

function displayAllRoles(data) {
  console.log("\n");
  console.table(data);
}

function displayAllEmployees(data) {
  console.log("\n");
  console.table(data);
}

function displayAllEmployeesByDepartment(data) {
  console.log("\n");
  console.table(data);
}

function displayAllEmployeesByManager(data) {
  console.log("\n");
  console.table(data);
}

module.exports = {
  displayAllDepartments,
};
module.exports = { displayAllRoles };
module.exports = { displayAllEmployees };
module.exports = { displayAllEmployeesByDepartment };
module.exports = { displayAllEmployeesByManager };
