const { referrerPolicy } = require('helmet');
const { valid } = require('joi');
const { modal, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Project extends modal {
        static associate(models) {
            Project.belongsTo(models.User, {
                foreignKey: 'createdBy',
                as: 'creator'
            });
            Project.hasMany(models.Task, {
                foreignKey: 'projectId',
                as: 'tasks'
            });
        }
    }

    Project.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100]
            }
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM('active', 'archive'),
            defaultValue: 'active'
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
        modelName: 'Project',
        paranoid: true
    });

    return Project
}