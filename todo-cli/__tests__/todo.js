const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

describe("Todo List Test Suite", () => {
  let todos;

  beforeAll(() => {
    todos = todoList();

    todos.add({ title: "Test overdue", dueDate: yesterday, completed: false });
    todos.add({ title: "Test due today - done", dueDate: today, completed: true });
    todos.add({ title: "Test due today - not done", dueDate: today, completed: false });
    todos.add({ title: "Test due later 1", dueDate: tomorrow, completed: false });
    todos.add({ title: "Test due later 2", dueDate: tomorrow, completed: false });
  });

  test("should add a new todo", () => {
    const initialCount = todos.all.length;
    todos.add({ title: "New todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(initialCount + 1);
  });

  test("should mark a todo as complete", () => {
    todos.markAsComplete(2); // index of "Test due today - not done"
    expect(todos.all[2].completed).toBe(true);
  });

  test("should return overdue items", () => {
    const overdueItems = todos.overdue();
    expect(overdueItems.every((item) => item.dueDate < today)).toBe(true);
  });

  test("should return due today items", () => {
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.every((item) => item.dueDate === today)).toBe(true);
  });

  test("should return due later items", () => {
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.every((item) => item.dueDate > today)).toBe(true);
  });
});
