import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Pokemon } from '../../interfaces/interfaces';
import Image from 'next/image';
import {
  Grid,
  Card,
  Text,
  Container,
  Button,
  Spinner,
} from '@nextui-org/react';
import { Layout } from '../../components/layouts';
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { useLazyGetPokemonQuery } from '../../services/pokemons';
import { useRouter } from 'next/router';
import ErrorBanner from '../../components/ui/ErrorBanner';
import NextLink from 'next/link';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = () => {
  const router = useRouter();
  const { name: namePokemon } = router.query;

  const [isFavorite, setIsFavorite] = React.useState(false);

  const [getPokemon, { isSuccess, isLoading, isError, data: pokemon }] =
    useLazyGetPokemonQuery();

  useEffect(() => {
    const fetchData = async () => {
      const idOrName = (namePokemon as string)?.toLowerCase();
      await getPokemon({ idOrName });
    };

    fetchData();
    if (isError) {
      router.push('/error');
    }
  }, [getPokemon, namePokemon, isError]);

  useEffect(() => {
    setIsFavorite(localFavorites.exitsPokemonInLocaleStorage(pokemon?.id));
  }, [pokemon?.id]);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon?.id);
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      confetti({
        particleCount: 100,
        spread: 170,
        origin: { y: 0.6, x: 0.5 },
      });
    }
  };
  if (isLoading || !isSuccess) return <Spinner />;
  if (isError) return <ErrorBanner />;

  return (
    <Layout title={pokemon.name}>
      <Grid.Container gap={1} justify='center'>
        <Grid xs={12} sm={6} md={3} xl={3}>
          <Card css={{ mw: '100%' }}>
            <Card.Image
              objectFit='contain'
              src={pokemon.sprites.other?.dream_world.front_default || ''}
              height={500}
              width='100%'
              alt={pokemon.name}
            />
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={6} xl={6}>
          <Card css={{ mw: '100%' }}>
            <Card.Header>
              <Text
                size={40}
                transform='uppercase'
                color='#666666'
                css={{ marginRight: '1rem' }}
              >
                #{pokemon.id}
              </Text>
              <Text size={40} transform='uppercase'>
                {pokemon.name}
              </Text>
              <NextLink href={'/'} passHref>
                <Button color='gradient' bordered auto css={{ marginLeft: '4rem' }}>
                  Back
                </Button>
              </NextLink>
            </Card.Header>
            <Card.Body>
              <Text size={20}>Sprites</Text>
              <Container css={{ padding: '0px' }}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Container
                  css={{ padding: '0px', display: 'flex', gap: '2rem' }}
                >
                  <div>
                    <Text size={20}>Abilities</Text>
                    {pokemon.abilities.map((e: any) => (
                      <p key={e.ability.name}>{e.ability.name} </p>
                    ))}
                  </div>
                  <div>
                    <Text size={20}>Types</Text>
                    {pokemon.types.map((e: any) => (
                      <p key={e.type.name} style={{ listStyle: 'none' }}>
                        {e.type.name}{' '}
                      </p>
                    ))}
                  </div>
                </Container>

                <Button
                  color='gradient'
                  bordered
                  auto
                  onClick={onToggleFavorite}
                  css={{ marginTop: '1rem' }}
                >
                  {!isFavorite ? 'Add Favorites' : 'Delete Favorites'}
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default PokemonByNamePage;
