import React, { useState } from 'react';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import Table from 'ui/components/Table';
import { useGetAllCitiesQuery } from '../../../api/city';
import { getShortDate } from 'utils';
import CreateCityModal from '../components/CreateCityModal';
const CityContainer = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const { isLoading, data: citiesData } = useGetAllCitiesQuery();

    return (
        <Container>
            <div className="mt-6 flex justify-end">
                <Button onClick={() => setOpenCreateModal(true)} rounded>
                    + Add New City
                </Button>
            </div>
            <div className="bg-white w-full overflow-x-auto mt-6">
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
                            { accessor: 'action', header: 'Action', align: 'center' },
                        ]}
                        data={
                            citiesData?.length
                                ? citiesData.map((data) => {
                                      return {
                                          name: data.name,
                                          uid: data.uid,
                                          country: data.country,
                                          createAt: getShortDate(data.createAt),
                                          car: data.assignedCar.length,
                                          operator: data.assignedOperator.length,
                                          action: (
                                              <div className="flex justify-center">
                                                  <Button rounded size="sm">
                                                      View
                                                  </Button>
                                              </div>
                                          ),
                                      };
                                  })
                                : []
                        }
                    />
                )}
            </div>

            <CreateCityModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
        </Container>
    );
};

export default CityContainer;
