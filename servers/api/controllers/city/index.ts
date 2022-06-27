import express from 'express';
import { handleValidation } from '../../middlewares/index';
import { BadRequest } from '../../common/errors';
import { getAllCity, createCity, createValidate } from '../../services/city';
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
    const cityDate = await createCity(city);
    res.status(201).send(cityDate);
  } catch (error) {
    next(error);
  }
};

router.get('/', getCitiesHandler);
router.post('/create', handleValidation(createValidate), createCityHander);
// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
