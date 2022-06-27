import React from 'react';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import Table from 'ui/components/Table';
import { useGetAllCitiesQuery } from '../../../api/city';

const CityContainer = () => {
    const { isLoading, data: citiesData } = useGetAllCitiesQuery();

    return (
        <Container>
            <div className="mt-6 flex justify-end">
                <Button rounded>+ Add New City</Button>
            </div>
            <div className="bg-white mt-6">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Table
                        columns={[
                            { accessor: 'uid', header: 'UID' },
                            { accessor: 'name', header: 'Name' },
                            { accessor: 'country', header: 'Country' },
                            { accessor: 'operator', header: 'Total Operator' },
                            { accessor: 'car', header: 'Total Car' },
                            { accessor: 'createAt', header: 'Created Date' },
                            { accessor: 'action', header: 'Action' },
                        ]}
                        data={
                            citiesData?.length
                                ? citiesData.map((data) => {
                                      return {
                                          name: data.name,
                                          uid: data.uid,
                                          country: data.country,
                                          createAt: new Date(data.createAt).valueOf(),
                                          car: data.assignedCar.length,
                                          operator: data.assignedOperator.length,
                                          action: <div>hi</div>,
                                      };
                                  })
                                : []
                        }
                    />
                )}
            </div>
        </Container>
    );
};

export default CityContainer;
