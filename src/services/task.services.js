const { Task, User } = require('../models');

module.exports = {
  createTask: async (taskData, userId) => {
    const { title, description, dueDate, priority, assignedUserId } = taskData;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status: 'pending',
      userId,
      assignedUserId,
    });

    return task;
  },

  getTasks: async (filters, userId, role) => {
    const { status, priority, dueDate, page = 1, limit = 10 } = filters;

    const where = {};
    if (role !== 'admin') {
      where.userId = userId;
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (dueDate) where.dueDate = dueDate;

    const tasks = await Task.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      include: [{ model: User, as: 'assignedUser', attributes: ['name', 'email'] }],
    });

    return tasks;
  },

  getTaskById: async (taskId, userId, role) => {
    const task = await Task.findByPk(taskId, {
        include: [{
            model: User,
            as: 'assignedUser',
            attributs: ['name', 'email']
        }],
    });

    if (!task) {
        throw new Error('Task not found');
    }

    if (role !== 'admin' && task.userId !== userId) {
        throw new Error('Not authorized to access this task');
    }

    return task;
  },

  updateTask: async (taskId, updates, userId, role) => {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    if (role !== 'admin' && task.userId !== userId) {
      throw new Error('Not authorized to update this task');
    }

    await task.update(updates);
    return task;
  },

  deleteTask: async (taskId, userId, role) => {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    if (role !== 'admin' && task.userId !== userId) {
      throw new Error('Not authorized to delete this task');
    }

    await task.destroy();
    return { message: 'Task deleted successfully' };
  },
};