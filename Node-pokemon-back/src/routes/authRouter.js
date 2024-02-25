const express = require('express');
const { getJWT } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.get('/auth', getJWT);

module.exports = authRouter;
