const taskService = require('../services/task.service');

module.exports = {
  createTask: async (req, res, next) => {
    try {
      const task = await taskService.createTask(req.body, req.user.id);
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedTask = await taskService.updateTask(id, req.body, req.user.id, req.user.role);
      res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id, req.user.id, req.user.role);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  getTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id, req.user.id, req.user.role);
      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  },

  getTasks: async (req, res, next) => {  // Using getTasks here
    try {
      const filters = req.query;  // Filter, sorting, pagination parameters
      const tasks = await taskService.getTasks(filters, req.user.id, req.user.role);
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  },
};