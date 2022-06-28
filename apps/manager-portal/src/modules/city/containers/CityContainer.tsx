import React, { useState } from 'react';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import Table from 'ui/components/Table';
import DeleteModal from 'ui/components/DeleteModal';
import { useDeleteCityMutation, useGetAllCitiesQuery } from '../../../api/city';
import { getShortDate } from 'utils';
import NoDataFound from 'ui/components/NoDataFound';
import CreateCityModal from '../components/CreateCityModal';
import { EditIcon, TrashIcon } from 'ui/icons';
import toast, { Toaster } from 'react-hot-toast';
import { City } from 'types';

const CityContainer = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [cityEditMode, setCityEditMode] = useState(false);
    const { isLoading, data: citiesData } = useGetAllCitiesQuery();
    const [deleteCity] = useDeleteCityMutation();

    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const handleOpenDeleteModal = (uid: City) => {
        setOpenDeleteModal(true);
        setSelectedCity(uid);
    };
    const handleOpenEditModal = (uid: City) => {
        setOpenCreateModal(true);
        setCityEditMode(true);
        setSelectedCity(uid);
    };

    const handleDeleteCity = async () => {
        if (!selectedCity) return;
        const response = await deleteCity(selectedCity.uid);
        if ('data' in response) {
            toast.success('City Deleted');
        }
    };

    const handleCloseCreateModal = () => {
        setSelectedCity(null);
        setCityEditMode(false);
        setOpenCreateModal(false);
    };

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
                ) : citiesData?.length ? (
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
                                              <div className="flex justify-center gap-2.5">
                                                  <div
                                                      title="Edit City"
                                                      onClick={() => handleOpenEditModal(data)}
                                                      className="w-7  h-7 rounded-full bg-ct-purple-700 bg-opacity-20 flex items-center justify-center cursor-pointer "
                                                  >
                                                      <EditIcon className="w-5 h-5 text-ct-purple-700 stroke-current" />
                                                  </div>
                                                  <div
                                                      title="Delete City"
                                                      onClick={() => handleOpenDeleteModal(data)}
                                                      className="w-7  h-7 rounded-full bg-ct-red-500 bg-opacity-20 flex items-center justify-center cursor-pointer "
                                                  >
                                                      <TrashIcon className="w-5 h-5 text-ct-red-500 stroke-current" />
                                                  </div>
                                              </div>
                                          ),
                                      };
                                  })
                                : []
                        }
                    />
                ) : (
                    <NoDataFound />
                )}
            </div>

            <CreateCityModal
                open={openCreateModal}
                onClose={handleCloseCreateModal}
                city={selectedCity}
                editMode={cityEditMode}
            />
            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={() => handleDeleteCity()}
            />
            <Toaster position="bottom-left" />
        </Container>
    );
};

export default CityContainer;
