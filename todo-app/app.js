const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Hello route
app.get("/", function (request, response) {
  response.send("Hello World");
});

// 1️⃣ GET /todos - Fetch all todos
app.get("/todos", async function (_request, response) {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return response.status(500).json(error);
  }
});

// 2️⃣ POST /todos - Create a new todo and respond with JSON
app.post("/todos", async function (request, response) {
  try {
    const { title, dueDate } = request.body;

    if (!title || !dueDate) {
      return response.status(400).json({ error: "Title and dueDate are required" });
    }

    const todo = await Todo.create({
      title,
      dueDate,
      completed: false,
    });

    return response.status(200).json(todo); 
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});


// 3️⃣ PUT /todos/:id/markAsCompleted - Mark todo as completed
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    todo.completed = true;
    await todo.save();
    return response.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// 4️⃣ DELETE /todos/:id - Delete a todo and return true/false
app.delete("/todos/:id", async function (request, response) {
  try {
    const deleted = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });
    return response.status(200).json(deleted === 1);
  } catch (error) {
    console.error(error);
    return response.status(500).json(false);
  }
});

module.exports = app;
