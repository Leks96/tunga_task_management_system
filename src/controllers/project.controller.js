const projectService = require('../services/project.service');
const { catchAsync } = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const createProject = catchAsync(async (req, res) => {
    const project = await projectService.createProject({
        ...req.body,
        createdBy: req.user.id
    });
})

const getProjects = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, search, sortBy, sortOrder = 'desc' } = req.query;
    const projects = await projectService.getProjects({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        sortBy,
        sortOrder,
        userId: req.user.id
    });
    res.json(projects);
});

const getProjectById = catchAsync(async (req, res) => {
    const project = await projectService.getProjectByid(req.param.id, req.user.id);
    if(!project) {
        throw new ApiError(404, 'Project not found');
    }
    res.json({ project });
})

const updateProject = catchAsync(async (req, res) => {
    const project = await projectService.updateProject(
        req.params.id,
        req.body,
        req.user.id
    );
    res.json({ project });
})

const deleteProject = catchAsync(async (req, res) => {
    await projectService.deleteProject(req.params.id, req.params.id);
    res.status(204).send();
})

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
}