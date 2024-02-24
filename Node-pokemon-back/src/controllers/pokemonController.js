const pokeApi = require('../utils/axios');

const getPokemons = async (req, res) => {
  try {
    const { type, name: nameQuery, page } = req.query;

    if (type) {
      const { data } = await pokeApi.get(`type/${type}`);

      const results = data.pokemon.map((p) => {
        const urlSegments = p.pokemon.url.split('/');
        const id = +urlSegments[urlSegments.length - 2];
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

        return {
          name: p.pokemon.name,
          url: p.pokemon.url,
          id: id,
          img: img,
        };
      });

      return res.status(200).json({ results });
    } else if (nameQuery) {
      const lowerCaseName = nameQuery.toLowerCase();
      const { data } = await pokeApi.get(`pokemon/${lowerCaseName}`);
      const { id, name, abilities, moves, sprites, types } = data;

      res.status(200).json({ id, name, abilities, moves, sprites, types });
    } else {
      const limitPorPagina = 20;
      const offset = (page - 1) * limitPorPagina;
      const { data } = await pokeApi.get(
        `/pokemon?offset=${offset}&limit=${limitPorPagina}`
      );
      // el total existe en data.count se harcodea la cantidad porque no existen mas imagenes en la url
      const totalElementos = 649;
      const totalPages = Math.ceil(totalElementos / limitPorPagina);
      const results = data.results
        .map((p) => {
          const urlSegments = p.url.split('/');
          const id = +urlSegments[urlSegments.length - 2];
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

          return {
            name: p.name,
            url: p.url,
            id: id,
            img: img,
          };
        })
        .filter((pokemon) => pokemon.id <= 649);
      return res.status(200).json({ ...data, totalPages, results });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error ${error.message}` });
  }
};

const getPokemonById = async (req, res) => {
  const { id: idParam } = req.params;
  try {
    const { data } = await pokeApi.get(`/pokemon/${idParam}`);

    const { id, name, abilities, moves, sprites, types } = data;

    res.status(200).json({ id, name, abilities, moves, sprites, types });
  } catch (error) {
    res.status(400).json({ msg: `Error ${error}` });
  }
};
const getPokemonTypes = async (req, res) => {
  try {
    const { data } = await pokeApi.get(`/type`);

    const filteredTypes = data.results.map((type, index) => ({
      id: index + 1,
      type: type.name,
    }));

    res.status(200).json(filteredTypes);
  } catch (error) {
    res.status(400).json({ msg: `Error ${error}` });
  }
};

module.exports = { getPokemons, getPokemonById, getPokemonTypes };
