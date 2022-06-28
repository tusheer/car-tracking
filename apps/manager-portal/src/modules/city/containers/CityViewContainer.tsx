import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import DeleteModal from 'ui/components/DeleteModal';
import NoDataFound from 'ui/components/NoDataFound';
import Table from 'ui/components/Table';
import { TrashIcon } from 'ui/icons';
import { getShortDate } from 'utils';
import { useDeleteAssignCarMutation, useGetCityQuery } from '../../../api/city';
import AssignCarModal from '../components/AssignCarModal';
import CityDetails from '../components/CityDetails';
import toast, { Toaster } from 'react-hot-toast';

const CityViewContainer = () => {
    const router = useRouter();
    const [assingCarModal, setAssignCarModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedCarUid, setSelectedUid] = useState<string | null>(null);

    const [deleteAssignCar] = useDeleteAssignCarMutation();
    const uid = router.query.uid as string;

    const handleDeleteCity = async () => {
        if (!selectedCarUid || !uid) return;

        const response = await deleteAssignCar({ carUid: selectedCarUid, cityUid: uid });
        if ('data' in response) {
            toast.success('Car Deleted');
        }
    };

    const handleOpenDeleteModal = (uid: string) => {
        setOpenDeleteModal(true);
        setSelectedUid(uid);
    };

    const { data: cityData, isLoading } = useGetCityQuery(uid as string, {
        skip: uid === undefined,
    });

    if (isLoading) {
        return <div>... Loading</div>;
    }

    return (
        <Container>
            {cityData?.uid ? (
                <>
                    <CityDetails {...cityData} />
                    <div className="mt-10">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-semibold">Assinged Car</h3>
                            <Button onClick={() => setAssignCarModal(true)}>New Car Assign</Button>
                        </div>

                        <div className="bg-white w-full overflow-x-auto mt-6">
                            {cityData.assignedCar?.length ? (
                                <Table
                                    columns={[
                                        { accessor: 'image', header: 'Image' },
                                        { accessor: 'uid', header: 'UID' },
                                        { accessor: 'name', header: 'Name' },
                                        { accessor: 'numberPlate', header: 'Number Plate' },

                                        { accessor: 'createAt', header: 'Created Date' },
                                        { accessor: 'action', header: 'Action', align: 'center' },
                                    ]}
                                    data={
                                        cityData.assignedCar.length
                                            ? cityData.assignedCar.map((data) => {
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

                                                      action: (
                                                          <div className="flex justify-center gap-2.5">
                                                              <div
                                                                  title="Delete City"
                                                                  onClick={() => handleOpenDeleteModal(data.uid)}
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
                    </div>
                    <AssignCarModal
                        open={assingCarModal}
                        assingedCar={cityData.assignedCar}
                        onClose={() => setAssignCarModal(false)}
                        cityUid={cityData.uid}
                    />
                    <DeleteModal
                        open={openDeleteModal}
                        onClose={() => setOpenDeleteModal(false)}
                        onDelete={() => handleDeleteCity()}
                    />
                    <Toaster position="bottom-left" />
                </>
            ) : (
                <NoDataFound />
            )}
        </Container>
    );
};

export default CityViewContainer;
