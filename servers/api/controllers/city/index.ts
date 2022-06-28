import express from 'express';
import { handleValidation } from '../../middlewares/index';
import {
  getAllCity,
  createCity,
  createValidate,
  deleteCity,
  updateCity,
  getCity,
  assignCar,
  removeAssignCar,
} from '../../services/city';
import dotenv from 'dotenv';
import randomId from '../../utils/randomId';

const router = express.Router();
dotenv.config();

const getCitiesHandler = async (req, res, next) => {
  try {
    const cities = await getAllCity();
    res.status(200).send(cities);
  } catch (error) {
    next(error);
  }
};
const getCityHandler = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const city = await getCity(uid);
    res.status(200).send(city);
  } catch (error) {
    next(error);
  }
};

const createCityHander = async (req, res, next) => {
  try {
    const city = req.body;
    city.createAt = new Date();
    city.updateAt = new Date();
    city.assignedCar = [];
    city.assignedOperator = [];
    city.uid = randomId(6);
    const cityData = await createCity(city);
    res.status(201).send(cityData);
  } catch (error) {
    next(error);
  }
};

const deleteCityHander = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const cityData = await deleteCity(uid);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};

const updateCityHander = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const city = req.body;
    const cityData = await updateCity(uid, city);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};

const assignCarHander = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const city = req.body;
    const cityData = await assignCar(uid, city);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};
const handleDeleteAssignCar = async (req, res, next) => {
  try {
    console.log(req.params);
    const { cityUid, carUid } = req.params;
    const cityData = await removeAssignCar(cityUid, carUid);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};

router.get('/', getCitiesHandler);
router.get('/:uid', getCityHandler);
router.post('/create', handleValidation(createValidate), createCityHander);
router.post('/:uid/assign/car', assignCarHander);
router.delete('/:cityUid/assign/car/:carUid', handleDeleteAssignCar);
router.put('/edit/:uid', handleValidation(createValidate), updateCityHander);
router.delete('/:uid', deleteCityHander);
// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
