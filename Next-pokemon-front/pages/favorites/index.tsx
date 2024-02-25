import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { localFavorites } from '../../utils';
import { Grid } from '@nextui-org/react';
import { Layout } from '../../components/layouts';
import { Nofavorites } from '../../components/ui';
import { CardPokemonFavorite } from '../../components/ui';

const Favorites: NextPage = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title='Favorites'>
      <Grid.Container gap={1}>
        {!favoritesPokemons.length ? (
          <Nofavorites />
        ) : (
          <CardPokemonFavorite favoritesPokemons={favoritesPokemons} />
        )}
      </Grid.Container>
    </Layout>
  );
};

export default Favorites;
