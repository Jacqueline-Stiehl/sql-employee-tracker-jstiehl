use employee_db;

INSERT INTO departments
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", "100000", 1),
("Salesperson", "80000", 1),
("Lead Engineer", "150000", 2),
("Software Engineer", "120000", 2),
("Account Manager", "160000", 3),
("Accountant", "125000", 3),
("Legal Team Lead", "250000", 4),
("Lawyer", "190000", 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Mary", "Morin", 1, null),
("Becky", "McCord", 2, 1),
("Rick", "Ekstrand", 3, null),
("Kay", "Scharf", 4, 3),
("Tara", "Woody", 5, null),
("Michael", "Nelson", 6, 5),
("Danika", "Grace", 7, null),
("Matthias", "Garrick", 8, 7),
("Sonja", "Johnson", 8, 7);

--Three parts when writing a query:
--1-what do you want to select? What do you want to see in the columns?
--select statements are kind of independent of the join
--2-which tables are involved
--3-what do the tables have in common (which ids match up)?

SELECT r.title, r.salary, d.name
FROM departments d
INNER JOIN roles r ON d.id = r.department_id;

--joining employees and role by role id and employee.role id
--one role can have many employees
SELECT e.first_name, e.last_name, r.title, r.salary
FROM roles r
INNER JOIN employees e ON r.id = e.role_id;
    --INNER JOIN departments d ON d.id = r.department_id;

--joining employees and manager by manager id and employee.id
--one manager can have many employees
SELECT e.first_name, e.last_name, r.title, e.manager_id, d.name AS department, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employees e
INNER JOIN roles r ON r.id = e.role_id
    INNER JOIN departments d ON d.id = r.department_id
    LEFT JOIN employees m ON e.manager_id = m.id;

--one department can have many employees
SELECT e.first_name, e.last_name, d.name
FROM employees e
INNER JOIN roles r ON r.id = e.role_id
    INNER JOIN departments d ON d.id = r.department_id;
--GROUP BY department;

SELECT e.first_name, e.last_name, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager 
FROM employees e 
INNER JOIN roles r ON r.id = e.role_id 
    INNER JOIN departments d ON d.id = r.department_id 
    LEFT JOIN employees m ON e.manager_id = m.id;

SELECT e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager 
FROM employees e 
INNER JOIN roles r ON r.id = e.role_id 
    INNER JOIN departments d ON d.id = r.department_id 
    LEFT JOIN employees m ON e.manager_id = m.id;

--for roles:
SELECT r.id, r.title, r.salary, d.name 
FROM roles r
INNER JOIN departments d ON d.id = r.department_id
  
  --for employees:
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employees e
INNER JOIN roles r ON r.id = e.role_id
    INNER JOIN departments d ON d.id = r.department_id
    LEFT JOIN employees m ON e.manager_id = m.id;