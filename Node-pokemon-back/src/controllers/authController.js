const jwt = require('jsonwebtoken');

const getJWT = async (req, res) => {
  try {
    const userData = {
      activePokedex: 'true',
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ msg: `Error ${error}` });
  }
};

module.exports = { getJWT };
