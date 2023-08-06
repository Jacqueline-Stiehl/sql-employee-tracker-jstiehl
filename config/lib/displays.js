//per Gary, this file does all of our output to the screen
const inquirer = require("inquirer");

function displayAllDepartments(data) {
  console.log("\n");
  console.table(data);
}

module.exports = {
  displayAllDepartments,
};
