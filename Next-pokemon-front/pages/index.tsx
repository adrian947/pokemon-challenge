import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { SmallPokemon } from '../interfaces/interfaces';
import { Button, Grid, Row } from '@nextui-org/react';
import { CardPokemon } from '../components/ui';
import { useCallback, useEffect, useState } from 'react';
import {  
  useLazyGetJWTQuery,  
  useLazyGetPokemonsQuery,
} from '../services/pokemons';
import { saveToken, setPokemons } from '../reduxSlice/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBanner from '../components/ui/ErrorBanner';
import Spinner from '../components/ui/Spinner';
import { Pagination } from '@nextui-org/react';
import styles from '../styles/Error.module.css';

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [getJWT] = useLazyGetJWTQuery();
  const [getPokemons, { isLoading, isError, data: allData }] =
    useLazyGetPokemonsQuery();

  const {
    pokemons,
    activeFilter,
    token: tokenStore,
  } = useSelector((state: any) => state.pokemons);

  const fetchPokemons = useCallback(async (token: string) => {
    const { data } = await getPokemons({ page });
    dispatch(setPokemons(data.results));
    dispatch(saveToken(token));
  }, [page, dispatch, getPokemons]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchPokemons(token);
    }
  }, [dispatch, fetchPokemons, page]);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBanner />;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLogin = async () => {
    const { data } = await getJWT(null);
    localStorage.setItem('token', data.token);
    dispatch(saveToken(data.token));
    fetchPokemons(data.token);
  };

  const ButtonLogin = () => (
    <div className={styles.container}>
      <Button color='gradient' bordered auto onClick={handleLogin}>
        Login
      </Button>
    </div>
  );

  return (
    <>
      {!tokenStore ? (
        <ButtonLogin />
      ) : (
        <Layout>
          {!activeFilter && (
            <Row css={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                total={allData?.totalPages}
                initialPage={1}
                onChange={(page: number) => handlePageChange(page)}
              />
            </Row>
          )}
          <Grid.Container gap={2} justify='center'>
            {pokemons.map((pokemon: SmallPokemon) => (
              <CardPokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </Grid.Container>
        </Layout>
      )}
    </>
  );
};

export default Home;
