'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here if needed in the future
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,           
      validate: {
        notEmpty: true,           
      },
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,           
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,        
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};
