const express = require('express');
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/project.controller');
const auth = require('../middleware/validate.middleware');
const validate = require('../middleware/validate.middleware');
const { projectSchema } = require('../utils/validators');

const router = express.Router();

router.post('/', auth(), validate(projectSchema), createProject);
router.get('/', auth(), getProjects);
router.put('/:id', auth(), updateProject);
router.delete('/:id', auth(), deleteProject);

module.exports = router;