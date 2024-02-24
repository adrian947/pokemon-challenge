import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../lib/StoreProvider';
// import { CompanyRequest, CompanyResponse } from 'app/interfaces';


export const pokemonsApi = createApi({
    reducerPath: 'pokemonsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            //   const token = (getState() as RootState)?.auth?.token as unknown;
            //   if (token) {
            //     headers.set('authorization', `Bearer ${token}`);
            //   }
            return headers;
        },
    }),
    //   tagTypes: ['get', 'companies'],
    endpoints: builder => ({
        getPokemons: builder.query({
            query: () => {
                return {
                    url: '/pokemons',
                    method: 'GET',                  
                };
            },
        }),
        getPokemon: builder.query({
          query: ({idOrName}) => ({
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
      
    }),
});

export const {
    useGetPokemonsQuery,
    useGetTypesPokemonQuery,
    useLazyGetPokemonQuery,
    useLazyGetPokemonsQuery,
    useLazyGetTypesPokemonQuery,
    useLazyGetPokemonfilteredQuery
    
} = pokemonsApi;
