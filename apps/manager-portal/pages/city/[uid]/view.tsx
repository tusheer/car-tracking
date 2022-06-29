import React, { ReactNode } from 'react';
import DashboardLayout from '../../../src/layouts/DashboardLayout';
import CityViewContainer from '../../../src/modules/city/containers/CityViewContainer';
import { withSession } from '../../_app';

const CityView = () => {
    return <CityViewContainer />;
};

CityView.getLayout = (page: ReactNode) => {
    return <DashboardLayout title="City">{page}</DashboardLayout>;
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
