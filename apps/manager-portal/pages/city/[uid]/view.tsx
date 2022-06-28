import React, { ReactNode } from 'react';
import DashboardLayout from '../../../src/layouts/DashboardLayout';
import CityViewContainer from '../../../src/modules/city/containers/CityViewContainer';

const CityView = () => {
    return <CityViewContainer />;
};

CityView.getLayout = (page: ReactNode) => {
    return <DashboardLayout title="City">{page}</DashboardLayout>;
};

export default CityView;
