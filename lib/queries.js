//per Gary, this file does all the database stuff
const inquirer = require("inquirer");
const connection = require("../config/connection"); //per Gary, this imports sql already connect to the database

/*
  We are making use of a mysql2 method called promise() which allows us to 
  perform our database query asynchronously. This means we don't need to use
  .then() blocks or callback functions, which makes it much easier run the queries 
  and return values from them.
*/

// const listAllDepartments = () =>
//   connection.promise().query("SELECT id, name FROM departments;");
//the two lines above do the same thing as the code on the two lines below:

function listAllDepartments() {
  return connection.promise().query("SELECT id, name FROM departments;");
}

function listAllEmployees() {
  return connection
    .promise()
    .query("SELECT id, first_name, last_name FROM employees;");
}

function listAllEmployeesByDepartment() {
  return connection
    .promise()
    .query(
      "SELECT e.first_name, e.last_name, d.name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;"
    );
}

function listAllEmployeesByManager() {
  return connection
    .promise()
    .query(
      "SELECT e.first_name, e.last_name, r.title, e.manager_id, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id LEFT JOIN employees m ON e.manager_id = m.id;"
    );
}

// function listAllEmployeesByDepartment() {
//   return connection
//     .promise()
//     .query("SELECT id, first_name, last_name, department_id FROM employees;");
// }

// function listAllDepartments2VERYBAD() {
//   //Gary provided this one to start
//   //per Gary, use connection.promise().query every time
//   return (
//     connection
//       .promise()
//       .query("SELECT department.id, department.name FROM departments;"),
//     (err, data) => {
//       console.log(data);
//       return data;
//       //do stuff with data received
//       //send a response back with the data
//     }
//   );
// }

//function listAllRoles() {}

// function removeEmployee() {
//   return connection
//     .promise()
//     .query(`DELETE FROM employees WHERE id = ?`, (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//     });
// }

module.exports = {
  listAllDepartments,
  listAllEmployees,
  listAllEmployeesByDepartment,
  listAllEmployeesByManager,
};
// module.exports = {
//   listAllRoles,
// };
