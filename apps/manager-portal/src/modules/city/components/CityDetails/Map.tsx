import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from 'types';

const Map: React.FC<Pick<City, 'assignedCar' | 'latitude' | 'longitude' | 'zoomLavel'>> = ({
    zoomLavel,
    assignedCar,
    latitude,
    longitude,
}) => {
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
            <Marker position={[40.8054, -74.0241]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
