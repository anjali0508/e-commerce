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
  try {
    const {
      category, color, size, brand,
    } = req.query;
    const items = await categoryService.getItems(category, color, size, brand);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(404).json({ message: 'Category doesnt exist' });
  }
};

module.exports = { createCategory, getFeatures, getItems };
