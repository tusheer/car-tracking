import express from 'express';
import { getAllcars } from '../../services/car';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const getCarsHandler = async (req, res, next) => {
  try {
    const user = await getAllcars();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

router.get('/', getCarsHandler);

// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
