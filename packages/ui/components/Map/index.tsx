import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { City } from 'types';

interface IMap extends Pick<City, 'assignedCar' | 'latitude' | 'longitude' | 'zoomLavel' | 'assignedOperator'> {
    icon: string;

    operatorIcon: string;
}

const Map: React.FC<IMap> = ({ zoomLavel, latitude, assignedCar, longitude, icon, assignedOperator, operatorIcon }) => {
    const CarIcon = L.icon({
        iconUrl: icon,
        iconSize: [60, 60],
    });
    const OperatorIcon = L.icon({
        iconUrl: operatorIcon,
        iconSize: [40, 40],
    });

    return (
        <MapContainer
            style={{ height: '400px', width: '100%', minHeight: '400px' }}
            center={[latitude, longitude]}
            zoom={zoomLavel}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {assignedCar.map((car) => {
                return (
                    <Marker icon={CarIcon} key={car.uid} position={[car.latitude, car.longitude]}>
                        <Popup>
                            <div className="flex gap-3">
                                <div className="h-20 w-20 overflow-hidden rounded">
                                    <img
                                        className="min-w-full min-h-full object-cover"
                                        src={car.image.url}
                                        alt={car.image.name}
                                    />
                                </div>
                                <div>
                                    <h5 className="text-lg ">
                                        Model Name: <b>{car.modelName}</b>
                                    </h5>
                                    <h5 className="text-lg ">
                                        Number Plate: <b>{car.numberPlate}</b>
                                    </h5>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
            {assignedOperator.map((operator) => {
                return (
                    <Marker
                        icon={OperatorIcon}
                        key={operator.uid}
                        position={[operator.latitude || 0, operator.longitude || 0]}
                    >
                        <Popup>
                            <div className="flex gap-3">
                                <div>
                                    <h5 className="text-lg ">
                                        Name: <b>{operator.firstName + ' ' + operator.lastName}</b>
                                    </h5>
                                    <h5 className="text-lg ">
                                        ID: <b>{operator.uid}</b>
                                    </h5>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
