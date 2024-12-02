const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: {
            types: DataTypes.STRING,
            allowNUll: false
        },
        description: DataTypes.TEXT,
        assignedUserId: DataTypes.INTEGER,
        dueDate: {
            type: DataTypes.DATE,
            allowNUll: false
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNUll: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
            allowNull: false,
            defaultValue: 'pending',
        },
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: 'assignedUserId',
            as: 'assignedUser'
        });
    };

    return Task;
}