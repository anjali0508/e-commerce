const { default: axios } = require('axios');
const categoryService = require('./category.service');
const { Category, Item } = require('../models');

describe('Create Category service', () => {
  it('should return a list of created category when db execution is successful', async (done) => {
    const axiosResponse = {
      data: {
        itemMetadata: ['lala'],
      },
      features: ['lala'],
    };
    const mockResponse = {
      dataValues:
        {
          id: 1,
          craeted_at: '2021-02-22T10:37:11.911Z',
          updated_at: '2021-02-22T10:37:11.911Z',
        },
    };
    jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);
    jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);
    jest.spyOn(Promise, 'all').mockResolvedValue([{ features: 'lala' }]);

    const createSpy = jest.spyOn(Category, 'create');
    const itemCreateSpy = jest.spyOn(Item, 'create');

    createSpy.mockResolvedValue(mockResponse);
    itemCreateSpy.mockResolvedValue(mockResponse);

    const response = await categoryService.createCategory('phone');
    expect(response).toEqual(mockResponse.dataValues);
    done();
  });
});

describe('getFeatures Service', () => {
  it('should return features present in a given category', async () => {
    const mockResponse = [{ dataValues: { color: 'pink', size: 20, brand: 'lala' } }];
    jest.spyOn(Item, 'findAll').mockResolvedValue(mockResponse);
    const receivedFeatures = await categoryService.getFeatures('phone');
    expect(receivedFeatures).toEqual({ features: { brand: ['lala'], color: ['pink'], size: [20] } });
  });
});

describe('Get Items Service', () => {
  it('should return items based on given category, shape, size', async () => {
    const mockResponse = [{ dataValues: { color: 'pink', size: 20, brand: 'lala' } }];
    jest.spyOn(Item, 'findAll').mockResolvedValue(mockResponse);
    const receivedFeatures = await categoryService.getFeatures('phone');
    expect(receivedFeatures).toEqual({ features: { brand: ['lala'], color: ['pink'], size: [20] } });
  });
});
