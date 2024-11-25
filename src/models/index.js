const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== path.basename(__filename) &&
            file.slice(-3) == '.js'
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model
    });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.sequelize = sequelize;

    module.exports = db;