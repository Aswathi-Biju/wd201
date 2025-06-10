const express = require("express");
const app = express();
const { Todo } = require("./models");

// Set view engine to EJS
app.set("view engine", "ejs");

// To serve static files (like styles.css)
app.use(express.static("public"));

// Middleware to parse request bodies (optional if needed)
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  res.render("index", { todos });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
