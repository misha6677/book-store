import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import Layout from '@/components/Layout/Layout';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={montserrat.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}