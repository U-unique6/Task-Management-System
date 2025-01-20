const express = require("express");
const db = require("./database");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.post("/tasks", (req, res) => {
  const { name, status } = req.body;
  const query = "INSERT INTO tasks (name, status) VALUES (?, ?)";
  db.run(query, [name, status || "Pending"], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: this.lastID, name, status });
    }
  });
});

app.put("/tasks/:id", (req, res) => {
  const { name, status } = req.body;
  const query = "UPDATE tasks SET name = ?, status = ? WHERE id = ?";

  db.run(query, [name, status, req.params.id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: req.params.id, name, status });
    }
  });
});
app.patch("/tasks/:id", (req, res) => {
  const { status } = req.body;
  const query = "UPDATE tasks SET status = ? WHERE id = ?";
  db.run(query, [status, req.params.id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: req.params.id, status });
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  const query = "DELETE FROM tasks WHERE id = ?";
  db.run(query, [req.params.id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: "Task deleted successfully." });
    }
  });
});
app.delete("/tasks", (req, res) => {
  const query = "DELETE FROM tasks";
  db.run(query, [], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ message: "All tasks deleted successfully." });
  });
});
// Set the port for the server to listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
