const inquirer = require("inquirer");
const connection = require("./config/connection");
const {
  listAllDepartments,
  listAllRoles,
  listAllEmployees,
  insertEmployee,
  insertRole,
  insertDepartment,
  updateEmployeeRole,
} = require("./lib/queries"); //lists all departments
const {
  displayAllDepartments,
  displayAllRoles,
  displayAllEmployees,
} = require("./lib/displays"); //displays all the departments

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an item from the list below:",
        name: "option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then(async (response) => {
      switch (response.option) {
        case "View all departments":
          const [rows] = await listAllDepartments();
          console.log(rows);

          displayAllDepartments(rows);
          start();
          break;

        case "View all roles":
          const [rows5] = await listAllRoles();
          console.log(rows5);

          displayAllRoles(rows5);
          start();
          break;

        case "View all employees":
          const [rows2] = await listAllEmployees();
          console.log(rows2);

          displayAllEmployees(rows2);
          start();
          break;

        //_______________________________________________
        case "Add an employee":
          addEmployee();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Update an employee role":
          updateEmployee();
      }
    });
}

function addEmployee() {
  listAllRoles().then(function ([roles]) {
    listAllEmployees().then(function ([employees]) {
      const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id,
      }));

      const managers = employees
        .filter((employee) => employee.manager === null)
        .map((manager) => ({
          value: manager.id,
          name: `${manager.first_name} ${manager.last_name}`,
        }));

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "fname",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "lname",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            choices: roleChoices,
            name: "newEmployeeRole",
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers,
            name: "manager",
          },
        ])
        .then(function (answers) {
          console.log(answers.manager);
          insertEmployee(
            answers.fname,
            answers.lname,
            answers.newEmployeeRole,
            answers.manager
          )
            .then(function () {
              console.log("Employee added.");
              start();
            })
            .catch(function (err) {
              console.log(err);
            });
        });
    });
  });
}

function addRole() {
  listAllDepartments().then(function ([departments]) {
    const departmentChoices = departments.map(({ id, name }) => ({
      name: `${name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new role?",
          name: "newRole",
        },
        {
          type: "number",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department?",
          choices: departmentChoices,
          name: "newRolesDepartment",
        },
      ])
      .then(function (response) {
        insertRole(
          response.newRole,
          response.salary,
          response.newRolesDepartment
        )
          .then(function () {
            console.log("New role added.");
            start();
          })
          .catch(function (err) {
            console.log(err);
          });
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new department name?",
        name: "newDepartment",
      },
    ])
    .then(function (responses) {
      insertDepartment(responses.newDepartment)
        .then(function () {
          console.log("New department added.");
          start();
        })
        .catch(function (err) {
          console.log(err);
        });
    });
}

function updateEmployee() {
  listAllEmployees().then(function ([employees]) {
    listAllRoles().then(function ([roles]) {
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );
      const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "What is the employee's name?",
            choices: employeeChoices,
            name: "id",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            choices: roleChoices,
            name: "newRole",
          },
        ])
        .then(function (answers) {
          updateEmployeeRole(answers.id, answers.newRole)
            .then(function () {
              console.log("Employee role updated.");
              start();
            })
            .catch(function (err) {
              console.log(err);
            });
        });
    });
  });
}

start();
