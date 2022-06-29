import React, { useEffect, useState } from 'react';
import { User } from 'types';
import Modal from 'ui/components/Modal';
import { CrossIcon } from 'ui/icons';
import Checkbox from 'ui/components/Checkbox';
import Button from 'ui/components/Button';
import { useAssignOperatorMutation } from '../../../../api/city';
import { useGetAllOperatorsQuery } from '../../../../api/auth';
interface IAssignCarModal {
    open: boolean;
    onClose: () => void;
    assingedOperator: User[];
    cityUid: string;
}

interface IOperatorList extends User {
    checked: boolean;
}

const AssignOperatorModal: React.FC<IAssignCarModal> = ({ open, onClose, assingedOperator, cityUid }) => {
    const [operatorList, setOperatorList] = useState<IOperatorList[]>([]);
    const [assignOperator] = useAssignOperatorMutation();

    const { data, isLoading } = useGetAllOperatorsQuery();

    useEffect(() => {
        if (data?.length) {
            const _user: IOperatorList[] = [];
            data?.forEach((user) => {
                const findCar = assingedOperator.find((_user) => _user.uid === user.uid);

                _user.push({
                    ...user,
                    checked: findCar ? true : false,
                });
            });
            setOperatorList(_user);
        }
    }, [data, assingedOperator]);

    const handleSelectOperator = (uid: string) => {
        const findIndex = operatorList.findIndex((car) => car.uid === uid);
        const _operatorList = [...operatorList];
        const _car = _operatorList[findIndex];
        _car.checked = !_car.checked;

        _operatorList[findIndex] = _car;

        setOperatorList(_operatorList);
    };

    const handleAssignCar = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const payload = operatorList.filter((car) => car.checked).map(({ checked, ...car }) => ({ ...car }));

        const response = await assignOperator({
            uid: cityUid,
            assignedOperator: payload,
        });

        if ('data' in response) {
            onClose();
        }
    };

    return (
        <Modal className="max-w-6xl  rounded-md" open={open} onClose={onClose}>
            <section className="w-full h-full">
                <header className="flex justify-between py-7 px-7 items-center">
                    <h2 className="text-xl font-semibold">Assign car</h2>

                    <span onClick={onClose}>
                        <CrossIcon className="h-7 w-7 cursor-pointer" />
                    </span>
                </header>
                {!isLoading && data ? (
                    <div className="overflow-y-auto flex-wrap gap-y-5 flex -mx-2.5 px-7 pb-6 pt-2 max-h-[calc(100vh-160px)]">
                        {operatorList.map((user) => {
                            return (
                                <div key={user.uid} className=" px-2.5  w-4/12 ">
                                    <div
                                        onClick={() => handleSelectOperator(user.uid)}
                                        className="bg-white border cursor-pointer shadow p-3 gap-4 items-center rounded-md shrink-0 flex"
                                    >
                                        <Checkbox checked={user.checked} />
                                        <div className="flex gap-3">
                                            <div>
                                                <h5>
                                                    Email : <span className="font-semibold">{user.email}</span>
                                                </h5>
                                                <p>
                                                    Name :
                                                    <span className="font-semibold">
                                                        {user.firstName + ' ' + user.lastName}{' '}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <div className="flex justify-end px-7 pb-7">
                    <Button onClick={handleAssignCar}>Assign</Button>
                </div>
            </section>
        </Modal>
    );
};

export default AssignOperatorModal;
