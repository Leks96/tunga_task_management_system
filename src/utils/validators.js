const Joi = require('joi');
const user = require('../models/user');
const email = require('./email');

exports.registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

exports.updatePasswordSchema = Joi.object({
    password: Joi.string().required(),
});

exports.projectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('active', 'completed', 'archived').default('active'),
});

exports.taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    dueDate: Joi.date().required,
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    assignedUserId: Joi.number(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
});