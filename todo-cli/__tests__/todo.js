const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];

describe("Todo List Test Suite", () => {
  let todos;
  const today = formattedDate(new Date());
  const yesterday = formattedDate(new Date(Date.now() - 86400000));
  const tomorrow = formattedDate(new Date(Date.now() + 86400000));

  beforeAll(() => {
    todos = todoList();

    todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    todos.add({ title: "Pay rent", dueDate: today, completed: true });
    todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
    todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
    todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });

  test("should add a new todo", () => {
    const initialLength = todos.all.length;
    todos.add({ title: "New Todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(initialLength + 1);
  });

  test("should mark a todo as complete", () => {
    todos.markAsComplete(2); // "Service Vehicle"
    expect(todos.all[2].completed).toBe(true);
  });

  test("should return overdue items", () => {
    const overdue = todos.overdue();
    expect(overdue.every((item) => item.dueDate < today)).toBe(true);
  });

  test("should return due today items", () => {
    const dueToday = todos.dueToday();
    expect(dueToday.every((item) => item.dueDate === today)).toBe(true);
  });

  test("should return due later items", () => {
    const dueLater = todos.dueLater();
    expect(dueLater.every((item) => item.dueDate > today)).toBe(true);
  });
});
