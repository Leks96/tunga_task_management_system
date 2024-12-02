const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const { defaultValueSchemable } = require("sequelize/lib/utils");
const { allow } = require("joi");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'completed', 'archived'),
            defaultValue: 'active',
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Project.associate = (models) => {
        Project.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
        Project.hasMany(models.Task, { as: 'tasks', foreignKey: 'projectId' });
    };

    return Project;
}