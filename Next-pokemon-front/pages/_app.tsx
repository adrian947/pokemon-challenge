import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { darkTheme } from '../themes';
import { Provider } from 'react-redux';
import { store } from '../lib/StoreProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp;
