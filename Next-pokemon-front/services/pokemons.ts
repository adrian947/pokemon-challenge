import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api',
    baseUrl: 'https://pokemon-challenge-bye0.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getPokemons: builder.query({
      query: (data) => {        
        return {
          url: '/pokemons',
          method: 'GET',
          params: data
        };
      },
    }),
    getPokemon: builder.query({
      query: ({ idOrName }) => ({
        url: `/pokemons/${idOrName}`,
        method: 'GET',
      }),
    }),
    getTypesPokemon: builder.query({
      query: () => ({
        url: `/types`,
        method: 'GET',
      }),
    }),
    getPokemonfiltered: builder.query({
      query: (data) => ({
        url: `/pokemons`,
        method: 'GET',
        params: data
      }),
    }),
    getJWT: builder.query({
      query: () => ({
        url: `/auth`,
        method: 'GET',

      }),
    }),

  }),
});

export const {
  useGetPokemonsQuery,
  useGetTypesPokemonQuery,
  useLazyGetPokemonQuery,
  useLazyGetPokemonsQuery,
  useLazyGetTypesPokemonQuery,
  useLazyGetPokemonfilteredQuery,
  useLazyGetJWTQuery


} = pokemonsApi;
