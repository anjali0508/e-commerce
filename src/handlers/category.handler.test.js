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
});