import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { City } from 'types';
import Button from 'ui/components/Button';
import DeleteModal from 'ui/components/DeleteModal';
import NoDataFound from 'ui/components/NoDataFound';
import Table from 'ui/components/Table';
import { TrashIcon } from 'ui/icons';
import { getShortDate } from 'utils';
import { useDeleteAssignCarMutation } from '../../../../api/city';
import AssignCarModal from '../AssignCarModal';

interface IAssignedCarList {
    assignedCar: City['assignedCar'];
    cityUid: string;
}

const AssignedCarList: React.FC<IAssignedCarList> = ({ cityUid, assignedCar }) => {
    const [deleteAssignCar] = useDeleteAssignCarMutation();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedCarUid, setSelectedUid] = useState<string | null>(null);

    const [assingCarModal, setAssignCarModal] = useState(false);
    const handleOpenDeleteModal = (uid: string) => {
        setOpenDeleteModal(true);
        setSelectedUid(uid);
    };

    const handleDeleteCity = async () => {
        if (!selectedCarUid || !cityUid) return;

        const response = await deleteAssignCar({ carUid: selectedCarUid, cityUid: cityUid });
        if ('data' in response) {
            toast.success('Car Deleted');
        }
    };

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Assinged Car</h3>
                <Button onClick={() => setAssignCarModal(true)}>New Car Assign</Button>
            </div>

            <div className="bg-white w-full overflow-x-auto mt-6">
                {assignedCar?.length ? (
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
            <AssignCarModal
                open={assingCarModal}
                assingedCar={assignedCar}
                onClose={() => setAssignCarModal(false)}
                cityUid={cityUid}
            />
            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={() => handleDeleteCity()}
            />
            <Toaster position="bottom-left" />
        </div>
    );
};

export default AssignedCarList;
