const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const auth = require('../middleware/validate.middleware');
const validate = require('../middleware/validate.middleware');
const { taskSchema } = require('../utils/validators');

const router = express.Router();

router.post('/', auth(), validate(taskSchema), createTask);
router.post('/', auth(), getTasks);
router.put('/:id', auth(), updateTask);
router.delete('/:id', auth(), deleteTask);

module.exports = router;