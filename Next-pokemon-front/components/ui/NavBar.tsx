import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Button,
  Container,
  Input,
  Link,
  Loading,
  Spacer,
  Switch,
  Text,
  theme,
  useTheme,
} from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import styles from '../../styles/NavBar.module.css';
import {
  useGetPokemonsQuery,
  useGetTypesPokemonQuery,
  useLazyGetPokemonfilteredQuery,
} from '../../services/pokemons';
import { useDispatch, useSelector } from 'react-redux';
import { activeFilter, setPokemons } from '../../reduxSlice/pokemonSlice';
import ErrorBanner from './ErrorBanner';
import Select from './Select';
import Spinner from './Spinner';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';

export const NavBar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const { pathname, push } = useRouter();
  const dispatch = useDispatch();

  const [isFindByName, setIsfindByName] = useState(false);
  const [inputFilter, setInputFilter] = useState('');

  const { data: allTypes, error, isLoading } = useGetTypesPokemonQuery(null);
  const { refetch, data: pokemonRefetch } = useGetPokemonsQuery(null);
  const [
    getPokemonfiltered,
    {
      isSuccess,
      isFetching,
      isLoading: isLoadingFilterd,
      isError,
      data: pokemon,
    },
  ] = useLazyGetPokemonfilteredQuery();

  useEffect(() => {
    const fetchData = async () => {
      await getPokemonfiltered(
        isFindByName ? { name: inputFilter } : { type: inputFilter }
      );
    };
    if (inputFilter) {
      fetchData();
    }
    dispatch(activeFilter(inputFilter))
  }, [inputFilter, getPokemonfiltered, isFindByName]);

  useEffect(() => {
    if (isSuccess && pokemon && !isFindByName) {
      dispatch(setPokemons(pokemon));
    }
    if (pokemon?.name && isFindByName) {
      push(`/name/${pokemon.name}`);
    }
  }, [dispatch, push, pokemon, isSuccess, isFindByName]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner />;

  const handleRefetch = async () => {
    await refetch();
    dispatch(setPokemons(pokemonRefetch));
    setInputFilter('');
    setIsfindByName(false);
  };

  return (
    <div className={styles.navbar}>
      <NextLink href={'/'} passHref>
        <Link css={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
            alt='pikachu'
            width={100}
            height={100}
          />

          <Text h1>P</Text>
          <Text h3>okedex</Text>
        </Link>
      </NextLink>
      {pathname === '/' && (
        <>
          <Spacer css={{ flex: 1 }} />
          <Container
            css={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <Button
              color='gradient'
              bordered
              auto
              onClick={() => {
                setIsfindByName(!isFindByName);
                setInputFilter('');
              }}
              css={{ minWidth: '12rem' }}
            >
              {!isFindByName ? 'Change find by name' : 'Change find by type'}
            </Button>

            {isFindByName ? (
              <Input
                placeholder='name...'
                status='primary'
                animated={false}
                type='text'
                onChange={(e) => setInputFilter(e.target.value)}
                aria-label={isFindByName ? 'ID input' : 'Name input'}
              />
            ) : (
              <Select
                isDark={isDark}
                options={allTypes}
                onSelectChange={(e) => setInputFilter(e)}
                inputFilter={inputFilter}
              />
            )}

            {isLoadingFilterd || isFetching ? (
              <Loading type='spinner' size='lg' />
            ) : (
              <Button color='gradient' bordered auto onClick={handleRefetch}>
                Reset
              </Button>
            )}
            {(isError && inputFilter) && (
              <Text color='error' css={{ margin: '0px' }}>
                Pokemon not found
              </Text>
            )}
          </Container>
        </>
      )}

      <Spacer css={{ flex: 1 }} />    
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        size='xl'
        iconOn={<SunIcon filled />}
        iconOff={<MoonIcon filled />}
        css={{ marginRight: '20px' }}
      />
      <NextLink href='/favorites' passHref>
        <Link>
          <Text h3>Favorites</Text>
        </Link>
      </NextLink>
    </div>
  );
};
