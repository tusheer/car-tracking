import express from 'express';
import { handleValidation } from '../../middlewares/index';
import { BadRequest } from '../../common/errors';
import { createUser, checkUser, createUserValidate, getAllOperators } from '../../services/auth';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const router = express.Router();
dotenv.config();
const createToken = (user) =>
  jwt.sign(
    { ...user, exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRES_IN || '50000000') },
    process.env.JWT_SECRET || 'secret'
  );

const createUserHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const userData = await createUser(user);
    if (userData) {
      res.status(201).send({
        status: 'ok',
        message: 'User created successfully',
        result: userData,
        authToken: createToken({ ...userData }),
      });
    } else {
      throw new BadRequest('User already exist');
    }
  } catch (error) {
    next(error);
  }
};

const managerLoginHandler = async (req, res, next) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await checkUser(req.body.email, req.body.password);
      if (user) {
        res.status(200).send({
          status: 'ok',
          result: {
            ...user,
          },
          authToken: createToken({ ...user }),
        });
        return;
      } else {
        throw new BadRequest('Invalid email or password ');
      }
    }
  } catch (error) {
    next(error);
  }
};
const operatorLoginHandler = async (req, res, next) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await checkUser(req.body.email, req.body.password);
      if (user && user.userType === 'OPERATOR') {
        res.status(200).send({
          status: 'ok',
          result: {
            ...user,
          },
          authToken: createToken({ ...user }),
        });
        return;
      } else {
        throw new BadRequest('Invalid email or password ');
      }
    }
  } catch (error) {
    next(error);
  }
};

const getAllOperatorsHandler = async (req, res, next) => {
  try {
    const allOperators = await getAllOperators();
    return res.status(200).send(allOperators);
  } catch (error) {
    next(error);
  }
};

router.post('/register', handleValidation(createUserValidate), createUserHandler);
router.post('/login/manager', managerLoginHandler);
router.post('/login/operator', operatorLoginHandler);
router.get('/user/operators', getAllOperatorsHandler);
// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
