const express = require('express');
const pokemonRouter = express.Router();

const {
  getPokemons,
  getPokemonById,
  getPokemonTypes,
} = require('../controllers/pokemonController.js');

pokemonRouter.get('/pokemons', getPokemons);
pokemonRouter.get('/pokemons/:id', getPokemonById);
pokemonRouter.get('/types', getPokemonTypes);

module.exports = pokemonRouter;
