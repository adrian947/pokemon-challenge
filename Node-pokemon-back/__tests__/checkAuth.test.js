const jwt = require('jsonwebtoken');
const { checkAuth } = require('../src/middleware/checkAuth');

describe('Middleware checkAuth function', () => {
  it('should be pass if token is valid', () => {
    const token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET);
    
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();

    checkAuth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res).toEqual({});
  });

  it('should be return 401 if token is not sent', () => {
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn((data) => {
          expect(data).toEqual({ msg: 'Invalid token not sent' });
        }),
      })),
    };
    const next = jest.fn();

    checkAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should be return 401 if token is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer token-invalido',
      },
    };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn((data) => {
          expect(data).toEqual({ msg: 'Invalid token' });
        }),
      })),
    };
    const next = jest.fn();

    checkAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
