import '../styles/build.css';
import '../styles/global.scss';
import Head from 'next/head';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="theme-color" content="#01896a" />
                <meta name="application-name" content="Car Tracking " />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#01896a" />
                <meta name="msapplication-tap-highlight" content="no" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
