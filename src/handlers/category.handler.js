const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const createdCategory = await categoryService.createCategory(category);
    return res.status(200).json(createdCategory);
  } catch (error) {
    console.log(error.data);
    return res.status(404).json({ error: error.message, message: 'Category doesnt exist' });
  }
};

const getFeatures = async (req, res) => {
  try {
    const {
      category,
    } = req.query;
    const features = await categoryService.getFeatures(category);
    return res.status(200).json(features);
  } catch (error) {
    console.log(error.data);
    return res.status(404).json({ message: 'Category doesnt exist' });
  }
};

const getItems = async (req, res) => {
  const {
    category, color, size, brand,
  } = req.query;
  const features = await categoryService.getItems(category, color, size, brand);
  res.status(200).json(features);
};

module.exports = { createCategory, getFeatures, getItems };
