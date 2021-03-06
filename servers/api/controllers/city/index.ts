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
  assignOperator,
  removeAssignOperator,
  getOperatorAssignedAllCity,
} from '../../services/city';
import dotenv from 'dotenv';
import randomId from '../../utils/randomId';
import { authenticateRequest } from '../../middlewares/index';

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
const getOperatorsAssignCitiesHandler = async (req, res, next) => {
  try {
    const cities = await getOperatorAssignedAllCity(req.user.uid);
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
const assignOperatorHander = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const opetators = req.body;
    const cityData = await assignOperator(uid, opetators);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};
const handleDeleteAssignCar = async (req, res, next) => {
  try {
    const { cityUid, carUid } = req.params;
    const cityData = await removeAssignCar(cityUid, carUid);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};
const handleDeleteAssignOperator = async (req, res, next) => {
  try {
    const { cityUid, operatorUid } = req.params;
    const cityData = await removeAssignOperator(cityUid, operatorUid);
    res.status(200).send(cityData);
  } catch (error) {
    next(error);
  }
};

router.get('/', authenticateRequest, getCitiesHandler);
router.get('/operator', authenticateRequest, getOperatorsAssignCitiesHandler);
router.get('/:uid', authenticateRequest, getCityHandler);
router.post('/create', authenticateRequest, handleValidation(createValidate), createCityHander);
router.post('/:uid/assign/car', authenticateRequest, assignCarHander);
router.post('/:uid/assign/operator', authenticateRequest, assignOperatorHander);
router.delete('/:cityUid/assign/car/:carUid', authenticateRequest, handleDeleteAssignCar);
router.delete('/:cityUid/assign/operator/:operatorUid', authenticateRequest, handleDeleteAssignOperator);
router.put('/edit/:uid', authenticateRequest, handleValidation(createValidate), updateCityHander);
router.delete('/:uid', authenticateRequest, deleteCityHander);
// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
