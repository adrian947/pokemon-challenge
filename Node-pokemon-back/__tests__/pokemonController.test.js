const {
  getPokemons,
  getPokemonById,
  getPokemonTypes,
} = require('../src/controllers/pokemonController');
const pokeApi = require('../src/utils/axios');

jest.mock('../src/utils/axios');

describe('getPokemons function', () => {
  it('should get Pokemon by type', async () => {
    const req = { query: { type: 'fire' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockApiResponse = {
      data: {
        pokemon: [
          {
            pokemon: {
              name: 'charmander',
              url: 'https://pokeapi.co/api/v2/pokemon/4/',
            },
          },
        ],
      },
    };
    pokeApi.get.mockResolvedValueOnce(mockApiResponse);

    await getPokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      results: expect.arrayContaining([
        expect.objectContaining({
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/',
          id: expect.any(Number),
          img: expect.any(String),
        }),
      ]),
    });
  });

  it('should get Pokemon by name', async () => {
    const req = { query: { name: 'charmander' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockApiResponse = {
      data: {
        id: 4,
        name: 'charmander',
        abilities: [],
        moves: [],
        sprites: {},
        types: [],
      },
    };
    pokeApi.get.mockResolvedValueOnce(mockApiResponse);

    await getPokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 4,
      name: 'charmander',
      abilities: expect.any(Array),
      moves: expect.any(Array),
      sprites: expect.any(Object),
      types: expect.any(Array),
    });
  });

  it('should get a list of Pokemons', async () => {
    const req = { query: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockApiResponse = {
      data: {
        count: 649,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      },
    };
    pokeApi.get.mockResolvedValueOnce(mockApiResponse);

    await getPokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      count: 649,
      totalPages: expect.any(Number),
      results: expect.arrayContaining([
        expect.objectContaining({
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          id: expect.any(Number),
          img: expect.any(String),
        }),
      ]),
    });
  });

  it('should handle errors', async () => {
    const req = { query: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    pokeApi.get.mockRejectedValueOnce(new Error('Mocked error'));

    await getPokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error Mocked error' });
  });
});

describe('getPokemonById function', () => {
  it('should get Pokemon by ID', async () => {
    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockApiResponse = {
      data: {
        id: 1,
        name: 'bulbasaur',
        abilities: [],
        moves: [],
        sprites: {},
        types: [],
      },
    };
    pokeApi.get.mockResolvedValueOnce(mockApiResponse);

    await getPokemonById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'bulbasaur',
      abilities: expect.any(Array),
      moves: expect.any(Array),
      sprites: expect.any(Object),
      types: expect.any(Array),
    });
  });

  it('should handle errors properly', async () => {
    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    pokeApi.get.mockRejectedValueOnce(new Error('Mocked error'));

    try {
      await getPokemonById(req, res);
    } catch (error) {
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: `Error ${error.message}` });
    }
  });
});

describe('getPokemonTypes function', () => {
  it('should get Pokemon types', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockApiResponse = {
      data: {
        results: [{ name: 'grass' }, { name: 'fire' }],
      },
    };
    pokeApi.get.mockResolvedValueOnce(mockApiResponse);

    await getPokemonTypes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, type: 'grass' },
      { id: 2, type: 'fire' },
    ]);
  });

  it('should handle errors properly', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    pokeApi.get.mockRejectedValueOnce(new Error('Mocked error'));

    try {
      await getPokemonTypes(req, res);
    } catch (error) {
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: `Error ${error.message}` });
    }
  });
});
