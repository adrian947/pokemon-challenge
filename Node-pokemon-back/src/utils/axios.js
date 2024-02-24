const axios = require('axios');

// Crea una instancia de Axios con la base URL predefinida
const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

module.exports = pokeApi;
