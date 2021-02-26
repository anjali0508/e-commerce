const categoryService = require('../services/category.service');
const categoryHandler = require('./category.handler');

describe('Create category & Item handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with created Category object', async (done) => {
    const mockResponseValue = {
      content: 'Keep smiling lol',
      id: 1,
    };
    jest.spyOn(categoryService, 'createCategory').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = { params: { category: 'phone' } };
    await categoryHandler.createCategory(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseValue);
    expect(categoryService.createCategory).toHaveBeenCalledWith('phone');
    done();
  });
  it('should set a status code of 404 along with created error message', async (done) => {
    jest.spyOn(categoryService, 'createCategory').mockImplementation(() => { throw new Error('error'); });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    await categoryHandler.createCategory(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    done();
  });
});

describe('Get features of given handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with features object', async (done) => {
    const mockResponseValue = {
      features: {
        color: 'blue',
      },
    };
    jest.spyOn(categoryService, 'getFeatures').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = { query: { category: 'phone' } };
    await categoryHandler.getFeatures(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseValue);
    expect(categoryService.getFeatures).toHaveBeenCalledWith('phone');
    done();
  });
  it('should set a status code of 404 along with created error message', async (done) => {
    jest.spyOn(categoryService, 'getFeatures').mockImplementation(() => { throw new Error('error'); });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    await categoryHandler.getFeatures(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    done();
  });
});

describe('Get items of given category, color, brand, size', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with items having given features', async (done) => {
    const mockResponseValue = {
      name: 'Iphone',
    };
    jest.spyOn(categoryService, 'getItems').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = {
      query: {
        category: 'phone', color: 'blue', brand: 'vivo', size: '20',
      },
    };
    await categoryHandler.getItems(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseValue);
    expect(categoryService.getItems).toHaveBeenCalledWith('phone', 'blue', '20', 'vivo');
    done();
  });

  it('should set a status code of 404 along with created error message', async (done) => {
    jest.spyOn(categoryService, 'getItems').mockImplementation(() => { throw new Error('error'); });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    await categoryHandler.getItems(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    done();
  });
});
