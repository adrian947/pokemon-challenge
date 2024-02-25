/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../lib/StoreProvider';

const slice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    activeFilter: false,
    token: null,
    page: 1,
  },
  reducers: {
    setPokemons: (state, { payload }) => {
      state.pokemons = payload;
    },
    activeFilter: (state, { payload }) => {
      state.activeFilter = !!payload;
    },
    saveToken: (state, { payload }) => {
      state.token = payload;
    },
    savePage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { savePage } = slice.actions;
export const { saveToken } = slice.actions;
export const { activeFilter } = slice.actions;
export const { setPokemons } = slice.actions;
export default slice.reducer;
export const selectPokemons = (state: RootState) => state.pokemons;
