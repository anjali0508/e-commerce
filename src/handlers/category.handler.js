const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const { category } = req.params;
  const createdCategory = await categoryService.createCategory(category);
  res.status(200).send(createdCategory);
};

const getFeatures = async (req, res) => {
  const { category } = req.query;
  const features = await categoryService.getFeatures(category);
  res.status(200).send(features);
};

module.exports = { createCategory, getFeatures };
