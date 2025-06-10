const express = require("express");
const { Todo } = require("./models");

const app = express();
app.use(express.json());

// GET /todos - Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// DELETE /todos/:id - Delete a todo by id
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Todo.destroy({ where: { id } });
    return res.status(200).json(deleted === 1);
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
