import React from 'react';

import Container from 'ui/components/Container';
import Table from 'ui/components/Table';

import { useGetAllCitiesQuery } from '../../../api/city';
import { getShortDate } from 'utils';
import NoDataFound from 'ui/components/NoDataFound';

import Link from 'next/link';

const CityContainer = () => {
    const { isLoading, data: citiesData } = useGetAllCitiesQuery();

    return (
        <Container>
            <div className="bg-white w-full overflow-x-auto mt-6">
                {isLoading ? (
                    <div>Loading...</div>
                ) : citiesData?.length ? (
                    <Table
                        columns={[
                            { accessor: 'uid', header: 'UID' },
                            { accessor: 'name', header: 'Name' },
                            { accessor: 'country', header: 'Country' },

                            { accessor: 'car', header: 'Total Car' },
                            { accessor: 'createAt', header: 'Created Date' },
                        ]}
                        data={
                            citiesData?.length
                                ? citiesData.map((data) => {
                                      return {
                                          name: data.name,
                                          uid: (
                                              <Link href={`/navigation/${data.uid}/view`}>
                                                  <a className="text-ct-purple-700 underline">{data.uid}</a>
                                              </Link>
                                          ),
                                          country: data.country,
                                          createAt: getShortDate(data.createAt),
                                          car: data.assignedCar.length,
                                      };
                                  })
                                : []
                        }
                    />
                ) : (
                    <NoDataFound />
                )}
            </div>
        </Container>
    );
};

export default CityContainer;
