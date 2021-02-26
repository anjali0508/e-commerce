const express = require('express');
const { healthHandler } = require('../handlers/health.handler');

const healthRouter = express.Router();

healthRouter.get('/', healthHandler);

module.exports = { healthRouter };
