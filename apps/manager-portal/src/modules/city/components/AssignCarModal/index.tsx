import React, { useEffect, useState } from 'react';
import { Car } from 'types';
import Modal from 'ui/components/Modal';
import { CrossIcon } from 'ui/icons';
import { useGetAllCarsQuery } from '../../../../api/car';
import Checkbox from 'ui/components/Checkbox';
import Button from 'ui/components/Button';
import { useAssignCarMutation } from '../../../../api/city';
interface IAssignCarModal {
    open: boolean;
    onClose: () => void;
    assingedCar: Car[];
    cityUid: string;
}

interface ICarList extends Car {
    checked: boolean;
}

const AssignCarModal: React.FC<IAssignCarModal> = ({ open, onClose, assingedCar, cityUid }) => {
    const [carList, setCarList] = useState<ICarList[]>([]);
    const [assignCar] = useAssignCarMutation();

    const { data, isLoading } = useGetAllCarsQuery();

    useEffect(() => {
        if (data?.length) {
            const _cars: ICarList[] = [];
            data?.forEach((car) => {
                const findCar = assingedCar.find((_car) => _car.uid === car.uid);

                _cars.push({
                    ...car,
                    checked: findCar ? true : false,
                });
            });
            setCarList(_cars);
        }
    }, [data, assingedCar]);

    const handleSelectCar = (uid: string) => {
        const findIndex = carList.findIndex((car) => car.uid === uid);
        const _carList = [...carList];
        const _car = _carList[findIndex];
        _car.checked = !_car.checked;

        _carList[findIndex] = _car;

        setCarList(_carList);
    };

    const handleAssignCar = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const payload = carList.filter((car) => car.checked).map(({ checked, ...car }) => ({ ...car }));

        const response = await assignCar({
            uid: cityUid,
            assignedCar: payload,
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
                    <div className="overflow-y-auto flex -mx-2.5 px-7 pb-6 pt-2 max-h-[calc(100vh-160px)]">
                        {carList.map((car) => {
                            return (
                                <div key={car.uid} className=" px-2.5  w-4/12 ">
                                    <div
                                        onClick={() => handleSelectCar(car.uid)}
                                        className="bg-white border cursor-pointer shadow p-3 gap-4 items-center rounded-md shrink-0 flex"
                                    >
                                        <Checkbox checked={car.checked} />
                                        <div className="flex gap-3">
                                            <div className="h-12 flex-shrink-0  w-12 relative rounded-md overflow-hidden">
                                                <img
                                                    className="object-cover min-w-full min-h-full"
                                                    src={car.image.url}
                                                    alt={car.image.name}
                                                />
                                            </div>
                                            <div>
                                                <h5>
                                                    Modal Name : <span className="font-semibold">{car.modelName}</span>
                                                </h5>
                                                <p>
                                                    Number Plate :{' '}
                                                    <span className="font-semibold"> {car.numberPlate}</span>
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

export default AssignCarModal;
