//per Gary, this file does all the database stuff
const inquirer = require("inquirer");
const connection = require("../config/connection"); //per Gary, this imports sql already connect to the database
const { displayAllDepartments } = require("./displays");

/*
  We are making use of a mysql2 method called promise() which allows us to 
  perform our database query asynchronously. This means we don't need to use
  .then() blocks or callback functions, which makes it much easier run the queries 
  and return values from them.
*/

function listAllDepartments() {
  //Gary provided this one to start
  //per Gary, use connection.promise().query every time
  return (
    connection
      .promise()
      .query("SELECT department.id, department.name FROM departments;"),
    (err, data) => {
      console.log(data);
      displayAllDepartments();
      //do stuff with data received
      //send a response back with the data
    }
  );
}

function listAllRoles() {
  return connection
    .promise()
    .query("SELECT role.id, role.title, role.salary FROM roles;");
}

function listAllEmployees() {
  return connection
    .promise()
    .query("SELECT employee.id, employee.first_name, employee.last_name;");
}

function listAllEmployeesByDepartment() {
  return connection
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, department_id;"
    );
}

function listAllEmployeesByManager() {
  return connection
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id;"
    );
}

function removeEmployee() {
  return connection
    .promise()
    .query(`DELETE FROM employees WHERE id = ?`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
}

module.exports = {
  listAllDepartments,
};
module.exports = { listAllRoles };
module.exports = { listAllEmployees };
module.exports = { listAllEmployeesByDepartment };
module.exports = { listAllEmployeesByManager };
