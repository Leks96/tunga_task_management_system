const { Modal, DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    class Task extends Modal {
        static associate(models) {
            Task.belongsTo(models.Project, {
                foreignKey: 'assignedTo',
                as: 'assignee'
            });
            Task.belongsTo(models.User, {
                foreignKey: 'assignedTo',
                as: 'assignee'
            });
            Task.belongsTo(models.User, {
                foreignKey: 'createdBy',
                as: 'creator'
            });
        }
    }

    Task.init({
        id: {
            types: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100]
            }
        },
        description: {
            type: DataTypes.TEXT
        },
        dueDate: {
            type: DataTypes.DATE
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            defaultValue: 'low'
        },
        status: {
            type: DataTypes.ENUM('todo', 'in_progress', 'completed'),
            defaultValue: 'todo'
        },
        projectID: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Task',
        paranoid: true
    });

    return Task;
};