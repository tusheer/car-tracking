import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { City } from 'types';
import Button from 'ui/components/Button';
import DeleteModal from 'ui/components/DeleteModal';
import NoDataFound from 'ui/components/NoDataFound';
import Table from 'ui/components/Table';
import { TrashIcon } from 'ui/icons';
import { getShortDate } from 'utils';
import { useDeleteAssignOperatorMutation } from '../../../../api/city';
import AssignOperatorModal from '../AssignOperatorModal';

interface IAssignedOperatorList {
    assignedOperator: City['assignedOperator'];
    cityUid: string;
}

const AssignedOperatorList: React.FC<IAssignedOperatorList> = ({ cityUid, assignedOperator }) => {
    const [deleteAssignOperator] = useDeleteAssignOperatorMutation();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedOperatorUid, setSelectedOperatorUid] = useState<string | null>(null);

    const [assingCarModal, setAssignCarModal] = useState(false);
    const handleOpenDeleteModal = (uid: string) => {
        setOpenDeleteModal(true);
        setSelectedOperatorUid(uid);
    };

    const handleDeleteOperator = async () => {
        if (!selectedOperatorUid || !cityUid) return;

        const response = await deleteAssignOperator({ operatorUid: selectedOperatorUid, cityUid: cityUid });
        if ('data' in response) {
            toast.success('Operator Deleted');
        }
    };

    return (
        <div className="mt-10 pb-10">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Assinged Operator</h3>
                <Button onClick={() => setAssignCarModal(true)}>New Operator Assign</Button>
            </div>

            <div className="bg-white w-full overflow-x-auto mt-6">
                {assignedOperator?.length ? (
                    <Table
                        columns={[
                            { accessor: 'uid', header: 'UID' },
                            { accessor: 'email', header: 'Email' },
                            { accessor: 'name', header: 'Name' },
                            { accessor: 'createAt', header: 'Created Date' },
                            { accessor: 'action', header: 'Action', align: 'center' },
                        ]}
                        data={
                            assignedOperator.length
                                ? assignedOperator.map((data) => {
                                      return {
                                          name: data.firstName + ' ' + data.lastName,
                                          uid: data.uid,
                                          email: data.email,
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
            <AssignOperatorModal
                open={assingCarModal}
                assingedOperator={assignedOperator}
                onClose={() => setAssignCarModal(false)}
                cityUid={cityUid}
            />
            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={() => handleDeleteOperator()}
            />
            <Toaster position="bottom-left" />
        </div>
    );
};

export default AssignedOperatorList;
