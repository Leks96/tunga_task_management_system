const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('.');
const { use } = require('../app');
const { valid, allow } = require('joi');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Project, {
                foreignKey: 'createdBy',
                as: 'projects'
            });
            User.hasMany(models.Task, {
                foreignKey: 'assignedTo',
                as: 'assignedTasks'
            });
        }

        async validatePassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validtae: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100]
            }
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user'
        },
        lastLogin: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeSave: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });

    return User;
}

