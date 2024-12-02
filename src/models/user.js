const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const { allow } = require("joi");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: { isIn: [['admin', 'user']] },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: 'assignedId', as: 'tasks' });
  };

  return User;
};