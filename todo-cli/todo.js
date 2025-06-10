const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (all[index]) {
      all[index].completed = true;
    }
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    const today = new Date().toISOString().split("T")[0];
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const dateStr = todo.dueDate === today ? "" : ` ${todo.dueDate}`;
        return `${checkbox} ${todo.title}${dateStr}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
