import { createValidate } from './validation';

import { NotFound } from '../../common/errors';
import { City } from 'types';
import randomId from '../../utils/randomId';

const cities: City[] = [
  {
    name: 'Dhaka',
    zoomLavel: 10,
    assignedCar: [],
    assignedOperator: [],
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
