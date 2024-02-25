const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      
      jwt.verify(token, process.env.JWT_SECRET);

      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ msg: 'Invalid token not sent' });
  }
};
module.exports = { checkAuth };
