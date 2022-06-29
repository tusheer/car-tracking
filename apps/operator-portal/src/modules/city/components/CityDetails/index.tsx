import React from 'react';
import dynamic from 'next/dynamic';
import { City } from 'types';
import { CarIcon } from 'ui/icons';

const NoSSRMap = dynamic(() => import('ui/components/Map'), { ssr: false });

const CityDetails: React.FC<City> = ({ country, image, assignedCar, name, zoomLavel, latitude, longitude }) => {
    return (
        <section className="mt-7 flex bg-white shadow-xl">
            <div className="w-9/12">
                <NoSSRMap
                    icon="/static/assets/images/car.png"
                    zoomLavel={zoomLavel}
                    assignedCar={assignedCar}
                    latitude={latitude}
                    longitude={longitude}
                />
            </div>
            <div className="w-3/12 relative">
                <img className="absolute object-cover min-w-full min-h-full" src={image.url} alt={image.name} />
                <div className="bg-black bg-opacity-30 relative h-full w-full p-5 flex flex-col justify-end gap-3 ">
                    <div className=" flex">
                        <div className="flex  gap-3 items-center">
                            <div className="text-lg   font-semibold text-white">{assignedCar.length}</div>
                            <div className="h-7 w-7 rounded-full flex justify-center items-center bg-ct-purple-700">
                                <CarIcon className="w-4 h-4 text-white stroke-current" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-semibold text-white">{name}</h2>
                        <h5 className="text-xl font-semibold text-white">{country}</h5>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CityDetails;
