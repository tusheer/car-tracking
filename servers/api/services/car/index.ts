import { Car } from 'types';
import randomId from '../../utils/randomId';

const cars: Car[] = [
  {
    numberPlate: 'DT-23323',
    modelName: 'BMW-52',
    uid: 'PTPTPTP',
    latitude: 23.8479,
    longitude: 90.2576,
    createAt: new Date(),
    updateAt: new Date(),
    image: {
      url: 'https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o=',
      name: 'Car',
    },
  },
  {
    numberPlate: 'PT-23323',
    modelName: 'Toyota',
    uid: randomId(6),
    latitude: 23.748,
    longitude: 90.4122,
    createAt: new Date(),
    updateAt: new Date(),
    image: {
      url: 'https://i.pinimg.com/originals/d9/5c/d0/d95cd04d85043401df2b957eeba934cd.jpg',
      name: 'Car',
    },
  },
  {
    numberPlate: 'TP-32',
    modelName: 'Range Rover',
    uid: randomId(6),
    latitude: 23.8759,
    longitude: 90.3795,
    createAt: new Date(),
    updateAt: new Date(),
    image: {
      url: 'https://www.motortrend.com/uploads/sites/10/2017/11/2016-land-rover-range-rover-evoque-hse-suv-angular-front.png',
      name: 'Car',
    },
  },
];

const getAllcars = async () => {
  return cars.sort((a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf());
};

export { getAllcars };
