import React from 'react';

import { City } from 'types';

import NoDataFound from 'ui/components/NoDataFound';
import Table from 'ui/components/Table';

import { getShortDate } from 'utils';

interface IAssignedCarList {
    assignedCar: City['assignedCar'];
    cityUid: string;
}

const AssignedCarList: React.FC<IAssignedCarList> = ({ assignedCar }) => {
    return (
        <div className="mt-10">
            <div className="bg-white w-full overflow-x-auto mt-6">
                {assignedCar?.length ? (
                    <Table
                        columns={[
                            { accessor: 'image', header: 'Image' },
                            { accessor: 'uid', header: 'UID' },
                            { accessor: 'name', header: 'Name' },
                            { accessor: 'numberPlate', header: 'Number Plate' },

                            { accessor: 'createAt', header: 'Created Date' },
                        ]}
                        data={
                            assignedCar.length
                                ? assignedCar.map((data) => {
                                      return {
                                          image: (
                                              <div className=" h-10 w-10  overflow-hidden rounded-md ">
                                                  <img
                                                      className="min-w-full min-h-full object-cover"
                                                      src={data.image.url}
                                                      alt={data.image.name}
                                                  />
                                              </div>
                                          ),
                                          name: data.modelName,
                                          uid: data.uid,
                                          numberPlate: data.numberPlate,
                                          createAt: getShortDate(data.createAt),
                                      };
                                  })
                                : []
                        }
                    />
                ) : (
                    <NoDataFound />
                )}
            </div>
        </div>
    );
};

export default AssignedCarList;
