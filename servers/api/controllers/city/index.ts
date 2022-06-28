import express from 'express';
import { handleValidation } from '../../middlewares/index';
import { BadRequest } from '../../common/errors';
import { getAllCity, createCity, createValidate, deleteCity, updateCity } from '../../services/city';
import dotenv from 'dotenv';
import randomId from '../../utils/randomId';

const router = express.Router();
dotenv.config();

const getCitiesHandler = async (req, res, next) => {
  try {
    const user = await getAllCity();
    res.status(200).send(user);
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

router.get('/', getCitiesHandler);
router.post('/create', handleValidation(createValidate), createCityHander);
router.post('/edit/:uid', handleValidation(createValidate), updateCityHander);
router.delete('/:uid', deleteCityHander);
// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
