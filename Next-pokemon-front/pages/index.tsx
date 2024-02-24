import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { PokemonListResults, SmallPokemon } from '../interfaces/interfaces';
import { Grid } from '@nextui-org/react';
import { CardPokemon } from '../components/ui';
import { useEffect } from 'react';
import { useGetPokemonsQuery } from '../services/pokemons';
import { setPokemons } from '../reduxSlice/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBanner from '../components/ui/ErrorBanner';
import Spinner from '../components/ui/Spinner';


const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { data: allDataPokemons, error, isLoading } = useGetPokemonsQuery(null);
  const pokemons: PokemonListResults = useSelector(
    (state: any) => state.pokemons.pokemons
  );

  useEffect(() => {
    if (allDataPokemons) {
      dispatch(setPokemons(allDataPokemons));
    }
  }, [dispatch, allDataPokemons]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner />;

  return (
    <Layout>
      <Grid.Container gap={2} justify='center'>
        {pokemons.results?.map((pokemon: SmallPokemon) => (
          <CardPokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default Home;
