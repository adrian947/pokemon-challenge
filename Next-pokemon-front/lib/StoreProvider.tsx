import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonsApi } from '../services/pokemons';
import pokemonSlice from '../reduxSlice/pokemonSlice';

const rootReducer = combineReducers({
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  pokemons: pokemonSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware) as any,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
