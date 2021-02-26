const express = require('express');
const categoryHandler = require('../handlers/category.handler');

const categoryRouter = express.Router();

categoryRouter.put('/:category', categoryHandler.createCategory);
categoryRouter.get('/features', categoryHandler.getFeatures);
categoryRouter.get('/', categoryHandler.getItems);
module.exports = {
  categoryRouter,
};
