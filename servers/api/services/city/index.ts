import {} from '../../common/handler';

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

export { getAllCity, createCity, createValidate };
