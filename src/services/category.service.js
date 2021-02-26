/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const axios = require('axios').default;
const { Category, Item } = require('../models');

const createCategory = async (category) => {
  try {
    const categoryToAdd = await Item.findAll({ where: { name: `${category}s` } });
    if (categoryToAdd !== undefined) {
      await Category.destroy({ where: { name: `${category}s` } });
      await Item.destroy({ where: { category } });
    }
    const itemIdList = [];

    const categoryResponse = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${category}`);

    const cateogoryItemsData = categoryResponse.data.itemMetadata.map(async (item) => {
      itemIdList.push(item.id);
      const itemFeatures = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${item.id}`);
      return itemFeatures.data;
    });

    const resolvedItemData = await Promise.all(cateogoryItemsData);

    for (let index = 0; index < resolvedItemData.length; index += 1) {
      await Item.create({
        itemId: itemIdList[index],
        description: categoryResponse.data.itemMetadata[index].description,
        color: resolvedItemData[index].features[0].value,
        size: resolvedItemData[index].features[1].value,
        brand: resolvedItemData[index].features[2].value,
        name: categoryResponse.data.itemMetadata[index].name,
        category,
      });
    }

    const createdCategory = await Category.create({
      name: categoryResponse.data.name,
      description: categoryResponse.data.description,
      items: itemIdList,
    });
    return createdCategory.dataValues;
  } catch (error) {
    throw (error);
  }
};

const getFeatures = async (category) => {
  try {
    const items = await Item.findAll({ where: { category } });
    const output = {};
    output.features = {};
    output.features.color = [];
    output.features.size = [];
    output.features.brand = [];
    items.forEach((item) => {
      output.features.color.push(item.dataValues.color);
      output.features.size.push(item.dataValues.size);
      output.features.brand.push(item.dataValues.brand);
    });
    return output;
  } catch (error) {
    throw (error);
  }
};

const getItems = async (category, color, size, brand) => {
  const whereCondition = {};
  if (category !== undefined) {
    whereCondition.category = category;
  }
  if (color !== undefined) {
    whereCondition.color = color;
  }
  if (size !== undefined) {
    whereCondition.size = size;
  }
  if (brand !== undefined) {
    whereCondition.brand = brand;
  }
  const items = await Item.findAll({
    where: whereCondition,
  });
  return items;
};

module.exports = { createCategory, getFeatures, getItems };
