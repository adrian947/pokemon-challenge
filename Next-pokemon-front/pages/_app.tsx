import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { store } from '../lib/StoreProvider';
import { darkTheme, lightTheme } from '../themes';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <Provider store={store}>
      <NextThemesProvider
        defaultTheme="dark"
        attribute='class'
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </Provider>
  );
}

export default MyApp;
