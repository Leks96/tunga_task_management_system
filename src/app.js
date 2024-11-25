require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { logger } = require('sequelize/lib/utils/logger');
const { error } = require('winston');

const app = express();

// Security handler
app.use(helmet());
app.use(cors());
app.use(compression());

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', { stream: logger.stream}));

//API routes

const apiVersion = process.env.API_VERSION|| 'v1';
app.use(`/api/${apiVersion}/auth`, authRouter);
app.use(`/api/${apiVersion}/projects`, projectRouter);
app.use(`/api/${apiVersion}/tasks`, taskRouter);

// Error Handling
app.use(errorHandler);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { logger.info(`Server is running on port ${PORT}`)});

module.exports = app;