const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];
const today = formattedDate(new Date());
const yesterday = formattedDate(new Date(new Date().setDate(new Date().getDate() - 1)));
const tomorrow = formattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
    todos.add({ title: "Test 1", dueDate: yesterday, completed: false });
    todos.add({ title: "Test 2", dueDate: today, completed: false });
    todos.add({ title: "Test 3", dueDate: tomorrow, completed: false });
  });

  test("should add a new todo", () => {
    const count = todos.all.length;
    todos.add({ title: "New Todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(count + 1);
  });

  test("should mark a todo as complete", () => {
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should return overdue items", () => {
    const overdueItems = todos.overdue();
    expect(overdueItems.every(item => item.dueDate < today)).toBe(true);
  });

  test("should return due today items", () => {
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.every(item => item.dueDate === today)).toBe(true);
  });

  test("should return due later items", () => {
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.every(item => item.dueDate > today)).toBe(true);
  });
});
