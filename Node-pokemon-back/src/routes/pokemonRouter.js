const express = require('express');
const pokemonRouter = express.Router();

const {
  getPokemons,
  getPokemonById,
  getPokemonTypes,
} = require('../controllers/pokemonController.js');
const { checkAuth } = require('../middleware/checkAuth.js');

pokemonRouter.get('/pokemons',checkAuth, getPokemons);
pokemonRouter.get('/pokemons/:id',checkAuth, getPokemonById);
pokemonRouter.get('/types',checkAuth, getPokemonTypes);

module.exports = pokemonRouter;
