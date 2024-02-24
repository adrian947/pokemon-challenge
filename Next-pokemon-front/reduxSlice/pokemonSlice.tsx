/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../lib/StoreProvider';

const slice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
  },
  reducers: {
    setPokemons: (state, { payload }) => {      
      state.pokemons = payload;
    },
  },
  
});

export const { setPokemons } = slice.actions;
export default slice.reducer;
export const selectPokemons = (state: RootState) => state.pokemons;

