/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../lib/StoreProvider';

const slice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    activeFilter: false
  },
  reducers: {
    setPokemons: (state, { payload }) => {
      state.pokemons = payload;
    },
    activeFilter: (state, { payload }) => {      
      state.activeFilter = !!payload;
    },
  },
});

export const { activeFilter } = slice.actions;
export const { setPokemons } = slice.actions;
export default slice.reducer;
export const selectPokemons = (state: RootState) => state.pokemons;
