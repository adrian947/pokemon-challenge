import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  useLazyGetJWTQuery,
  useLazyGetPokemonsQuery,
} from '../services/pokemons';
import { savePage, saveToken, setPokemons } from '../redux/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';

import { SmallPokemon } from '../interfaces/interfaces';
import { Button, Grid, Loading, Row } from '@nextui-org/react';
import { CardPokemon } from '../components/ui';

import styles from '../styles/Error.module.css';
import { Pagination } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import Spinner from '../components/ui/Spinner';

const Home: NextPage = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [getJWT, { error: errorToken }] = useLazyGetJWTQuery();
  const [getPokemons, { isLoading, isError, data: allData }] =
    useLazyGetPokemonsQuery();

  const {
    pokemons,
    activeFilter,
    token: tokenStore,
    page,
  } = useSelector((state: any) => state.pokemons);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getPokemons({ page });
      dispatch(setPokemons(data.results));
    } catch (error) {
      push('/error');
    } finally {
      setLoading(false);
    }
  }, [page, dispatch, push, getPokemons]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(saveToken(token));
    if (token) {
      fetchPokemons();
    }
    if (isError) {
      push('/error');
    }
  }, [dispatch, fetchPokemons, push, page, isError]);

  const handlePageChange = (newPage: number) => {
    dispatch(savePage(newPage));
  };

  const handleLogin = async () => {
    const { data } = await getJWT(null);
    if (data) {
      localStorage.setItem('token', data.token);
      dispatch(saveToken(data.token));
      fetchPokemons();
    }
  };

  const ButtonLogin = () => (
    <div className={styles.container}>
      <Button color='gradient' bordered auto onClick={handleLogin}>
        Login
      </Button>
      {loading && (
        <>
          <Loading
            type='gradient'
            loadingCss={{ $$loadingSize: '50px', $$loadingBorder: '10px' }}
            css={{
              margin: '20px 0px',
            }}
          />
          <p>Wait, we are bringing up the server. It may take up to 1 minute.</p>
          <p>Espera, estamos iniciando el servidor. Puede tardar hasta 1 minuto.</p>
          {/* @ts-ignore */}
          <p>{errorToken && errorToken.data.msg}</p>
        </>
      )}
    </div>
  );

  if (isLoading) return <Spinner />;
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
                initialPage={page}
                onChange={(page: number) => handlePageChange(page)}
                page={page}
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
