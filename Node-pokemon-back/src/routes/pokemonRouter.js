const express = require('express');
const pokemonRouter = express.Router();

const {
  getPokemons,
  getPokemonById,
  getPokemonTypes,
} = require('../controllers/pokemonController.js');
const { checkAuth } = require('../middleware/checkAuth.js');
const {
  validateQueryParams,
  validatePokemonParams,
} = require('../validators/pokemonsValidator.js');

/**
 * @openapi
 * '/api/pokemons':
 *  get:
 *     tags: [Pokemon Controller]
 *     security:
 *       - bearerAuth: []
 *     summary: Get pokemons
 *     parameters:
 *      - name: name
 *        in: path
 *        description: Get pokemon by name
 *        required: false
 *        example: Pikachu
 *      - name: type
 *        in: path
 *        description: Get pokemons by types
 *        required: false
 *        example: electric
 *      - name: page
 *        in: path
 *        description: Get pokemons paginated
 *        required: false
 *        example: 1
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *           application/json:
 *             example:
 *               count: 1302
 *               next: "https://pokeapi.co/api/v2/pokemon?offset=80&limit=20"
 *               previous: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20"
 *               results:
 *                 - name: "poliwhirl"
 *                   url: "https://pokeapi.co/api/v2/pokemon/61/"
 *                   id: 61
 *                   img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/61.svg"
 *      400:
 *        description: Bad Request
 */
pokemonRouter.get('/pokemons', checkAuth, validateQueryParams, getPokemons);

/**
 * @openapi
 * /api/pokemons/{id}:
 *   get:
 *     summary: Get a Pokemon by ID
 *     description: Retrieve details of a Pokemon using its ID.
 *     tags: [Pokemon Controller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Pokemon to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Bulbasaur
 *               abilities: []
 *               moves: []
 *               sprites: []
 *               types: []
 *       '400':
 *        description: Bad Request
 */
pokemonRouter.get(
  '/pokemons/:id',
  checkAuth,
  validatePokemonParams,
  getPokemonById
);

/**
 * @openapi
 * /api/types:
 *   get:
 *     summary: Get a types pokemons
 *     tags: [Pokemon Controller]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   type:
 *                     type: string
 *                     description: The type of Pokemon
 *       '400':
 *        description: Bad Request
 */
pokemonRouter.get('/types', checkAuth, getPokemonTypes);

module.exports = pokemonRouter;
