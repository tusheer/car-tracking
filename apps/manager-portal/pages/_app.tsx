import '../styles/build.css';
import '../styles/global.scss';
import { ReactNode, ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { User } from 'types';
import jwt from 'jsonwebtoken';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement, pageProps: AppProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return <Provider store={store}>{getLayout(<Component {...pageProps} />, { ...pageProps })}</Provider>;
}

export const withSession = (
    getSerSideProps: (ctx: GetServerSidePropsContext, user: User | null) => any
): GetServerSideProps => {
    return (ctx: GetServerSidePropsContext) => {
        const { req } = ctx;
        const token = req.cookies.token || '';
        const secret = process.env.JWT_SECRET || 'secret';
        let user: User | null = null;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    user = null;
                } else {
                    user = decoded as User;
                }
            });
        }

        return getSerSideProps(ctx, user);
    };
};

export default MyApp;
