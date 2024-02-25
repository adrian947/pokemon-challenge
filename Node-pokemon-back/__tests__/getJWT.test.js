const jwt = require('jsonwebtoken');
const { getJWT } = require('../src/controllers/authController');

describe('getJWT function', () => {
  it('should generate a valid JWT token', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getJWT(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it('should handle errors properly', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    try {
      await getJWT(req, res);
    } catch (error) {
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: `Error ${error.message}` });
    }
  });
});
