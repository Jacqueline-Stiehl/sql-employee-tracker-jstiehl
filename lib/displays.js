//this file does all of our output to the screen
const inquirer = require("inquirer");
const connection = require("../config/connection");

function displayAllDepartments(data) {
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
  displayAllRoles,
  displayAllEmployees,
  displayAllEmployeesByDepartment,
  displayAllEmployeesByManager,
};
