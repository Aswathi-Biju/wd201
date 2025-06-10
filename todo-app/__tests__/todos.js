const request = require("supertest");
const app = require("../app");
const { Todo, sequelize } = require("../models");

beforeAll(async () => {
  // Reset database before tests
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close DB connection after tests
  await sequelize.close();
});

describe("DELETE /todos/:id", () => {
  it("should delete a todo and return true", async () => {
    // Create a todo first
    const todo = await Todo.create({
      title: "Test todo for deletion",
      dueDate: new Date(),
      completed: false,
    });

    // Call DELETE /todos/:id
    const response = await request(app).delete(`/todos/${todo.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true);

    // Check that the todo is actually deleted
    const deletedTodo = await Todo.findByPk(todo.id);
    expect(deletedTodo).toBeNull();
  });

  it("should return false when trying to delete a non-existent todo", async () => {
    const response = await request(app).delete("/todos/999999");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(false);
  });
});
