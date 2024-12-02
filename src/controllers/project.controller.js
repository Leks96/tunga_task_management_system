const { where } = require('sequelize');
const { Project, User } = require('../models');

module.exports = {
    createProject: async (req, res, next) =>{
        try {
            const { name, description } = req.body;

            const project = await Project.create({
                name,
                description,
                ownerId: req.user.id,
            })

            res.status(201).json({ message: 'Project created successfully', project });
        } catch (error) {
            next(error);
        }
    },

    getProjects: async (req, res, next) => {
        try {
            const projects = await Project.findAll({
                where: { ownerId: req.user.id },
                include: [{ model: User, as: 'owner', attribute: ['name', 'email'] }],
            });

            res.json({ projects });
        } catch (error) {
            next(error);
        }
    },

    updateProject: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const project = await Project.findOne({
                where: { id, ownerId: req.user.id}
            });

            if (!project) return res.status(404).json({ message: 'Project not found' });
            
            await project.update(updates);
            res.json({ message: 'Project updated successfully', project });
        } catch (error) {
            next(error);
        }
    },

    deleteProject: async (req, res, next) => {
        try {
            const { id } = req.params;

            const project = await Project.findOne({
                where: { id, ownerId: req.user.id }
            });

            if (!project) return res.status(404).json({ message: 'Project not found' });

            await project.destroy();
            res.json({ message: 'Project deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}