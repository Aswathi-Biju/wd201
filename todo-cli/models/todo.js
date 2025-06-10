"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((item) => {
        console.log(item.displayableString());
      });
    }

    static async overdue() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: { [sequelize.Sequelize.Op.lt]: today },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: { [sequelize.Sequelize.Op.gt]: today },
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
  const isDueToday = this.dueDate === today;
  const isOverdue = this.dueDate < today;

  // Show date only if NOT due today, OR if it's overdue (even if completed)
  const displayDate = isDueToday ? "" : ` ${this.dueDate}`;

  return `${this.id}. ${checkbox} ${this.title.trim()}${displayDate}`;
}


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
        allowNull: false,
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
