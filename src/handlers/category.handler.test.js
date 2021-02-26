const quoteService = require('../services/category.service');
const quoteHandler = require('./category.handler');

describe('Create category & Item handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with created Category object', async (done) => {
    const mockResponseValue = {
      content: 'Keep smiling lol',
      id: 1,
    };
    jest.spyOn(quoteService, 'createCategory').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = { params: { category: 'phone' } };
    await quoteHandler.createCategory(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseValue);
    expect(quoteService.createCategory).toHaveBeenCalledWith('phone');
    done();
  });
  it('should set a status code of 404 along with created error message', async (done) => {
    jest.spyOn(quoteService, 'createCategory').mockImplementation(() => { throw new Error('error'); });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    await quoteHandler.createCategory(null, mockResponse);
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
    jest.spyOn(quoteService, 'getFeatures').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = { query: { category: 'phone' } };
    await quoteHandler.getFeatures(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseValue);
    expect(quoteService.getFeatures).toHaveBeenCalledWith('phone');
    done();
  });
  it('should set a status code of 404 along with created error message', async (done) => {
    jest.spyOn(quoteService, 'getFeatures').mockImplementation(() => { throw new Error('error'); });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    await quoteHandler.getFeatures(null, mockResponse);
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
    jest.spyOn(quoteService, 'getItems').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = {
      query: {
        category: 'phone', color: 'blue', brand: 'vivo', size: '20',
      },
    };
    await quoteHandler.getItems(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseValue);
    expect(quoteService.getItems).toHaveBeenCalledWith('phone', 'blue', '20', 'vivo');
    done();
  });

  it('should set a status code of 404 along with created error message', async (done) => {
    jest.spyOn(quoteService, 'getItems').mockImplementation(() => { throw new Error('error'); });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    await quoteHandler.getItems(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    done();
  });
});
