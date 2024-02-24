import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { PokemonListResults, SmallPokemon } from '../interfaces/interfaces';
import { Grid, Row } from '@nextui-org/react';
import { CardPokemon } from '../components/ui';
import { useEffect, useState } from 'react';
import { useGetPokemonsQuery } from '../services/pokemons';
import { setPokemons } from '../reduxSlice/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBanner from '../components/ui/ErrorBanner';
import Spinner from '../components/ui/Spinner';
import { Pagination } from '@nextui-org/react';

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    data: allDataPokemons,
    error,
    isLoading,
  } = useGetPokemonsQuery({ page });
  const { pokemons, activeFilter } = useSelector(
    (state: any) => state.pokemons
  );

  useEffect(() => {
    if (allDataPokemons) {
      dispatch(setPokemons(allDataPokemons));
    }
  }, [dispatch, allDataPokemons]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner />;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Layout>
      {!activeFilter && (
        <Row css={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            total={pokemons.totalPages}
            initialPage={1}
            onChange={(page: number) => handlePageChange(page)}
          />
        </Row>
      )}
      <Grid.Container gap={2} justify='center'>
        {pokemons.results?.map((pokemon: SmallPokemon) => (
          <CardPokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default Home;
