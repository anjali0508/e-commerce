/* eslint-disable no-await-in-loop */
const axios = require('axios').default;
const { Category, Item } = require('../models');

const createCategory = async (category) => {
  const categoryResponse = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${category}`);

  const itemIdList = [];

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
};

const getFeatures = async (category) => {
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
  console.log(output);
  return output;
};

module.exports = { createCategory, getFeatures };
