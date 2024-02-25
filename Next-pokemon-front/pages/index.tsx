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
import { setPokemons } from '../reduxSlice/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import { Pagination } from '@nextui-org/react';
import styles from '../styles/Error.module.css';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [token, setToken] = useState<string | null>(null);

  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [getJWT] = useLazyGetJWTQuery();
  const [getPokemons, { isLoading, isError, data: allData }] =
    useLazyGetPokemonsQuery();

  const {
    pokemons,
    activeFilter,    
  } = useSelector((state: any) => state.pokemons);

  const fetchPokemons = useCallback(async () => {
    try {
      const { data } = await getPokemons({ page });
      dispatch(setPokemons(data.results));
    } catch (error) {
      push('/error');
    }
  }, [page, dispatch, push, getPokemons]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    if (token) {
      fetchPokemons();
    }
    if (isError) {
      push('/error');
    }
  }, [dispatch, fetchPokemons, push, page, isError]);

  if (isLoading) return <Spinner />;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLogin = async () => {
    const { data } = await getJWT(null);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    fetchPokemons();
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
      {!token ? (
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
