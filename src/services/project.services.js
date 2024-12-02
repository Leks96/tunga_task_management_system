const { Project, Task } = require('../models');

module.exports = {
  createProject: async (projectData, userId) => {
    const { name, description } = projectData;

    const project = await Project.create({
      name,
      description,
      ownerId: userId,
    });

    return project;
  },

  getProjects: async (userId, role) => {
    const where = role === 'admin' ? {} : { ownerId: userId };

    const projects = await Project.findAll({
      where,
      include: [{ model: Task, as: 'tasks', attributes: ['id', 'title', 'status'] }],
    });

    return projects;
  },

  updateProject: async (projectId, updates, userId, role) => {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    if (role !== 'admin' && project.ownerId !== userId) {
      throw new Error('Not authorized to update this project');
    }

    await project.update(updates);
    return project;
  },

  deleteProject: async (projectId, userId, role) => {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    if (role !== 'admin' && project.ownerId !== userId) {
      throw new Error('Not authorized to delete this project');
    }

    await project.destroy();
    return { message: 'Project deleted successfully' };
  },
};