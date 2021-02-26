const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  const createdCategory = await categoryService.createCategory(category);
  res.status(200).send(createdCategory);
};
module.exports = { createCategory };
