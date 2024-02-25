const { query, param, validationResult } = require('express-validator');

const allowedQuerys = ['name', 'type', 'page'];
const allowedParams = ['id'];

const validateQueryParams = [
  query('name').optional().isString(),
  query('type').optional().isString(),
  query('page').optional().isInt(),

  (req, res, next) => {
    const invalidParams = Object.keys(req.query).filter(
      (param) => !allowedQuerys.includes(param)
    );

    if (invalidParams.length > 0) {
      return res
        .status(400)
        .json({ error: `Invalid params: ${invalidParams.join(', ')}` });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

const validatePokemonParams = [
  param('id').isString(),

  (req, res, next) => {
    const invalidParams = Object.keys(req.params).filter(
      (param) => !allowedParams.includes(param)
    );

    if (invalidParams.length > 0) {
      return res.status(400).json({
        error: `Parámetros no permitidos: ${invalidParams.join(', ')}`,
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = {
  validateQueryParams,
  validatePokemonParams,
};
