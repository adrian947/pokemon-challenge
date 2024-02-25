import { FC } from 'react';
import { useRouter } from 'next/router';
import { SmallPokemon } from '../../interfaces/interfaces';
import { Button, Card, Grid, Text, Row } from '@nextui-org/react';

interface Props {
  pokemon: SmallPokemon;
}

export const CardPokemon: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const handleClickName = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={12} sm={6} md={5} xl={3}>
      <Card css={{ w: '100%', p: 0 }}>
        <Card.Header css={{ zIndex: 1, top: 5 }}>
          <Row gap={1}>
            <Text h3 weight='bold' color='#9E9E9E'>
              #{pokemon.id}
            </Text>
            <Text h3 transform='uppercase'>
              {pokemon.name}
            </Text>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Image
            objectFit='contain'
            src={pokemon.img}
            height={300}
            width='100%'
            alt='Relaxing app background'
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'relative',
            bgBlur: '#0f1114',
            borderTop: '$borderWeights$light solid $gray700',
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Button
            flat
            auto
            rounded
            css={{ color: '#94f9f0', bg: '#94f9f026', width: '100%' }}
            onClick={handleClickName}
          >
            <Text
              css={{ color: 'inherit' }}
              size={14}
              weight='bold'
              transform='uppercase'
            >
              See Card Pokemon
            </Text>
          </Button>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
