import { createValidate } from './validation';

import { NotFound } from '../../common/errors';
import { City } from 'types';
import randomId from '../../utils/randomId';

const cities: City[] = [
  {
    name: 'Dhaka',
    zoomLavel: 10,
    assignedCar: [
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
    ],
    assignedOperator: [
      {
        email: 'operator@gmail.com',
        createAt: new Date(),
        updateAt: new Date(),
        lastName: '1',
        firstName: 'User',
        password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
        isActive: true,
        uid: '123456',
        latitude: 23.8007,
        longitude: 90.4262,
        userType: 'OPERATOR',
      },
    ],
    country: 'Bangladesh',
    uid: randomId(6),
    latitude: 23.777176,
    longitude: 90.399452,
    createAt: new Date(),
    updateAt: new Date(),
    image: {
      url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/97/9d.jpg',
      name: 'National parliament',
    },
  },
];

const getAllCity = async () => {
  return cities.sort((a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf());
};
const getOperatorAssignedAllCity = async (operatorUid) => {
  return cities
    .sort((a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf())
    .filter((city) => {
      return city.assignedOperator.find((operator) => operator.uid === operatorUid);
    });
};
const getCity = async (uid) => {
  const findIndex = cities.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  return cities[findIndex];
};

const createCity = async (payload) => {
  cities.push(payload);
  return payload;
};
const deleteCity = async (uid) => {
  const findIndex = cities.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  const removeItem = cities.splice(findIndex, 1);
  return removeItem;
};

const updateCity = async (uid, payload) => {
  const findIndex = cities.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  const _city = {
    ...cities[findIndex],
    ...payload,
  };

  cities[findIndex] = _city;

  return _city;
};
const assignCar = async (uid, payload) => {
  const findIndex = cities.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  const _city = {
    ...cities[findIndex],
    assignedCar: payload,
  };

  cities[findIndex] = _city;

  return _city;
};
const assignOperator = async (uid, payload) => {
  const findIndex = cities.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  const _operator = {
    ...cities[findIndex],
    assignedOperator: payload,
  };

  cities[findIndex] = _operator;

  return _operator;
};
const removeAssignCar = async (cityUid, carUid) => {
  const findCityIndex = cities.findIndex((data) => data.uid === cityUid);

  if (findCityIndex < 0) {
    return new NotFound('City Not found');
  }

  const assignedCarsList = cities[findCityIndex].assignedCar;

  const findCarIndex = assignedCarsList.findIndex((car) => car.uid === carUid);

  assignedCarsList.splice(findCarIndex, 1);

  cities[findCityIndex].assignedCar = assignedCarsList;

  return cities[findCityIndex];
};
const removeAssignOperator = async (cityUid, operatorUid) => {
  const findCityIndex = cities.findIndex((data) => data.uid === cityUid);

  if (findCityIndex < 0) {
    return new NotFound('City Not found');
  }

  const assignedOperatorList = cities[findCityIndex].assignedOperator;

  const findOperatorIndex = assignedOperatorList.findIndex((car) => car.uid === operatorUid);

  assignedOperatorList.splice(findOperatorIndex, 1);

  cities[findCityIndex].assignedOperator = assignedOperatorList;

  return cities[findCityIndex];
};

export {
  getAllCity,
  createCity,
  createValidate,
  deleteCity,
  updateCity,
  getCity,
  assignCar,
  removeAssignCar,
  assignOperator,
  removeAssignOperator,
  getOperatorAssignedAllCity,
};
