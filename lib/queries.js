//this file does all the database stuff
const inquirer = require("inquirer");
const connection = require("../config/connection"); //this imports sql already connect to the database

function listAllDepartments() {
  return connection.promise().query("SELECT id, name FROM departments;");
}

//listAllRoles lists departments names in Workbench and department ids here
function listAllRoles() {
  return connection
    .promise()
    .query(
      "SELECT r.id, r.title, r.salary, d.name AS department FROM roles r INNER JOIN departments d ON d.id = r.department_id;"
    );
}

function listAllEmployees() {
  return connection
    .promise()
    .query(
      "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id LEFT JOIN employees m ON e.manager_id = m.id;"
    );
}

function insertEmployee(first_name, last_name, role_id, manager_id) {
  return connection
    .promise()
    .query(
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
}

function insertDepartment(name, department_id) {
  return connection
    .promise()
    .query("INSERT INTO departments(name) VALUES (?)", [name]);
}

function insertRole(title, salary, department_id) {
  return connection
    .promise()
    .query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department_id]
    );
}

function updateEmployeeRole(employee_id, role_id) {
  return connection
    .promise()
    .query("UPDATE employees SET role_id = ? WHERE id = ?", [
      role_id,
      employee_id,
    ]);
}

module.exports = {
  listAllDepartments,
  listAllRoles,
  listAllEmployees,
  insertEmployee,
  insertRole,
  insertDepartment,
  updateEmployeeRole,
};
