import { createValidate } from './validation';

import { NotFound } from '../../common/errors';
import { City } from 'types';
import randomId from '../../utils/randomId';

const cities: City[] = [
  {
    name: 'Dhaka',
    zoomLavel: 4,
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
const removeAssignCar = async (cityUid, carUid) => {
  const findCityIndex = cities.findIndex((data) => data.uid === cityUid);

  if (findCityIndex < 0) {
    return new NotFound('City Not found');
  }

  const assignedCarsList = cities[findCityIndex].assignedCar;

  const findCarIndex = assignedCarsList.findIndex((car) => car.uid === carUid);

  console.log(findCarIndex);

  assignedCarsList.splice(findCarIndex, 1);

  cities[findCityIndex].assignedCar = assignedCarsList;

  return cities[findCityIndex];
};

export { getAllCity, createCity, createValidate, deleteCity, updateCity, getCity, assignCar, removeAssignCar };
