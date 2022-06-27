import React, { ReactNode } from 'react';
import DashboardLayout from '../../src/layouts/DashboardLayout';
import CityContainer from '../../src/modules/city/containers/CityContainer';

const City = () => {
    return <CityContainer />;
};

City.getLayout = (page: ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default City;
