import React, { ReactNode } from 'react';
import DashboardLayout from '../../src/layouts/DashboardLayout';
import CityContainer from '../../src/modules/city/containers/CityContainer';
import { withSession } from '../_app';

const City = () => {
    return <CityContainer />;
};

City.getLayout = (page: ReactNode) => {
    return <DashboardLayout title="All Cities">{page}</DashboardLayout>;
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
