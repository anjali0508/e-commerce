const express = require('express');
const categoryHandler = require('../handlers/category.handler');

const categoryRouter = express.Router();

categoryRouter.put('/:category', categoryHandler.createCategory);
categoryRouter.get('/', categoryHandler.getFeatures);
module.exports = {
  categoryRouter,
};
