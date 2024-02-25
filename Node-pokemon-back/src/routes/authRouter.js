const express = require('express');
const { getJWT } = require('../controllers/authController');
const authRouter = express.Router();

/**
 * @openapi
 * /api/auth:
 *   get:
 *     summary: Get token for others request
 *     tags: [Auth Controller]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *              example:
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVQb2tlZGV4IjoidHJ1ZSIsImlhdCI6MTcwODg4MDI5MiwiZXhwIjoxNzA4ODgzODkyfQ.MYOnZ09enQjuCCb5Q-Nkbg_TSyLEp8NGqHwxjWmQ72U"
 *       '400':
 *        description: Bad Request
 */
authRouter.get('/auth', getJWT);

module.exports = authRouter;
