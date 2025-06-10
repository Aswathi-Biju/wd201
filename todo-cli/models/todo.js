"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdues = await Todo.overdue();
      overdues.forEach((todo) => console.log(todo.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const today = await Todo.dueToday();
      today.forEach((todo) => console.log(todo.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const later = await Todo.dueLater();
      later.forEach((todo) => console.log(todo.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: new Date().toISOString().slice(0, 10),
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    displayableString() {
  const checkbox = this.completed ? "[x]" : "[ ]";
  const today = new Date().toISOString().slice(0, 10);
  const displayDate = this.dueDate === today && !this.completed ? "" : ` ${this.dueDate}`;
  return `${this.id}. ${checkbox} ${this.title.trim()}${displayDate}`;
}


  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
