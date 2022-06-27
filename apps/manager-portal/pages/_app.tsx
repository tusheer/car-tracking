import '../styles/build.css';
import '../styles/global.scss';
import { ReactNode, ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../src/store';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}

export default MyApp;
