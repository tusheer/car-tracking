import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import Container from 'ui/components/Container';

import NoDataFound from 'ui/components/NoDataFound';

import { useGetCityQuery } from '../../../api/city';

import AssignedCarList from '../components/AssignedCarList';
import AssignedOperatorList from '../components/AssignedOperatorList';
import CityDetails from '../components/CityDetails';

const CityViewContainer = () => {
    const router = useRouter();

    const uid = router.query.uid as string;

    const { data: cityData, isLoading } = useGetCityQuery(uid as string, {
        skip: uid === undefined,
    });

    if (isLoading) {
        return <div>... Loading</div>;
    }

    return (
        <Container>
            {cityData?.uid ? (
                <Fragment>
                    <CityDetails {...cityData} />
                    <AssignedCarList cityUid={cityData.uid} assignedCar={cityData.assignedCar} />
                    <AssignedOperatorList cityUid={cityData.uid} assignedOperator={cityData.assignedOperator} />
                </Fragment>
            ) : (
                <NoDataFound />
            )}
        </Container>
    );
};

export default CityViewContainer;
