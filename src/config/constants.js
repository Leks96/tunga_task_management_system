const { USE } = require("sequelize/lib/index-hints");

module.exports = {
    ROLE: {
        ADMIN: 'admin',
        USER: 'user',
    },
    TASK_STATUSES: ['pending', 'in-progress', 'completed'],
}