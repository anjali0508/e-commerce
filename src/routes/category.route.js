const express = require('express');
const categoryHandler = require('../handlers/category.handler');

const categoryRouter = express.Router();

categoryRouter.put('/:category', categoryHandler.createCategory);

module.exports = {
  categoryRouter,
};
