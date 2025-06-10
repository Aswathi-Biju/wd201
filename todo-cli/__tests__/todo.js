const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];

describe("Todo List Test Suite", () => {
  let todos;
  const today = formattedDate(new Date());
  const yesterday = formattedDate(new Date(Date.now() - 86400000));
  const tomorrow = formattedDate(new Date(Date.now() + 86400000));

  beforeEach(() => {
    todos = todoList();
  });

  test("should add a new todo", () => {
    const initialLength = todos.all.length;
    todos.add({ title: "Test adding", dueDate: today, completed: false });
    expect(todos.all.length).toBe(initialLength + 1);
    expect(todos.all[0].title).toBe("Test adding");
  });

  test("should mark a todo as complete", () => {
    todos.add({ title: "Mark me complete", dueDate: today, completed: false });
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should return overdue items", () => {
    todos.add({ title: "Overdue task", dueDate: yesterday, completed: false });
    const items = todos.overdue();
    expect(items.length).toBe(1);
    expect(items[0].dueDate).toBe(yesterday);
  });

  test("should return due today items", () => {
    todos.add({ title: "Due today task", dueDate: today, completed: false });
    const items = todos.dueToday();
    expect(items.length).toBe(1);
    expect(items[0].dueDate).toBe(today);
  });

  test("should return due later items", () => {
    todos.add({ title: "Due later task", dueDate: tomorrow, completed: false });
    const items = todos.dueLater();
    expect(items.length).toBe(1);
    expect(items[0].dueDate).toBe(tomorrow);
  });
});
