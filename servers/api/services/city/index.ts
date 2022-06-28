import { createValidate } from './validation';

import { NotFound } from '../../common/errors';
import { City } from 'types';
import randomId from '../../utils/randomId';

const city: City[] = [
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
  return city.sort((a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf());
};

const createCity = async (payload) => {
  city.push(payload);
  return payload;
};
const deleteCity = async (uid) => {
  const findIndex = city.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  const removeItem = city.splice(findIndex, 1);
  return removeItem;
};

const updateCity = async (uid, payload) => {
  const findIndex = city.findIndex((data) => data.uid === uid);
  if (findIndex < 0) {
    return new NotFound('City Not found');
  }

  const _city = {
    ...city[findIndex],
    ...payload,
  };

  city[findIndex] = _city;

  return _city;
};

export { getAllCity, createCity, createValidate, deleteCity, updateCity };
