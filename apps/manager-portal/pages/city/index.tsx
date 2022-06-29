import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';
import { User } from 'types';
import AuthLayout from '../../src/layouts/AuthLayout';
import DashboardLayout from '../../src/layouts/DashboardLayout';
import CityContainer from '../../src/modules/city/containers/CityContainer';
import { withSession } from '../_app';

const City = () => {
    return <CityContainer />;
};

City.getLayout = (page: ReactNode, pageProps: AppProps & { user: User }) => {
    return (
        <AuthLayout user={pageProps.user}>
            <DashboardLayout title="All Cities">{page}</DashboardLayout>
        </AuthLayout>
    );
};

export const getServerSideProps = withSession(async (ctx, user) => {
    if (user) {
        return {
            props: {
                user,
            },
        };
    }
    return { redirect: { destination: '/', permanent: false } };
});

export default City;
