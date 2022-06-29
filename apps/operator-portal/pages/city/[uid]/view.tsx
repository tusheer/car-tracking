import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';
import { User } from 'types';
import AuthLayout from '../../../src/layouts/AuthLayout';
import DashboardLayout from '../../../src/layouts/DashboardLayout';
import CityViewContainer from '../../../src/modules/city/containers/CityViewContainer';
import { withSession } from '../../_app';

const CityView = () => {
    return <CityViewContainer />;
};

CityView.getLayout = (page: ReactNode, pageProps: AppProps & { user: User }) => {
    return (
        <AuthLayout user={pageProps.user}>
            <DashboardLayout title="City">{page}</DashboardLayout>
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

export default CityView;
