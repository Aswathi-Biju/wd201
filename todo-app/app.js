const express = require("express");
const { Todo } = require("./models");

const app = express();
app.use(express.json());

// GET /todos - Fetch all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /todos - Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { title, dueDate, completed } = req.body;
    const todo = await Todo.create({ title, dueDate, completed });
    return res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(422).json(error);
  }
});

// PUT /todos/:id/markAsComplete - Mark a todo as complete
app.put("/todos/:id/markAsComplete", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.update({ completed: true });
    return res.status(200).json(todo);
  } catch (error) {
    console.error("Error marking todo complete:", error);
    return res.status(500).json({ error: "Failed to mark todo as complete" });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    return res.status(200).json(deleted === 1);
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
