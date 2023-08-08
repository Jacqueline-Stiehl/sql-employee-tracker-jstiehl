const express = require("express");
const path = require("path");
//const PORT = 3001;
const PORT = process.env.PORT || 3001;
const app = express();

//const api = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//app.use("/api", api); //goes to ./routes/index
//could add "authenticate" between "/api" and api above to have this apply to all

//add an employee
app.post("/api/new-employee", ({ body }, res) => {
  const sql = `INSERT INTO employees (first_name, last_name)
  VALUES (?)`;
  const params = [body.first_name, body.last_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success!",
      data: body,
    });
  });
});

// OR:
app.post("/api/new-employee", (req, res) => {
  const values = Object.keys(req.body)
    .map((key) => req.body[key])
    .join(", ");
  db.query(
    "INSERT INTO employees (first_name, last_name VALUES (?)",
    req.body,
    (err, data) => {}
  );
});

//read/list all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT id, first_name last_name AS name FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success!",
      data: rows,
    });
  });
});

//remove an employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "Deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//update employee role
app.put("/api/role/:id", (req, res) => {
  const sql = `UPDATE roles SET role = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "Success!",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

//update employee manager --NOT SURE HOW TO DO THIS ONE
app.put("/api/manager/:id", (req, res) => {
  const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "???",
      });
    } else {
      res.json({
        message: "Success!",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
