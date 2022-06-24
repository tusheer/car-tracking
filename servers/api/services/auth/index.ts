import { save, findOne } from '../../common/handler';
import { createUserValidate } from './validation';
import bcrypt from 'bcrypt';
import User from '../../models/User';

const modelName = 'User';

async function getPasswordHash(password) {
  return await bcrypt.hash(password, 10);
}

const searchOne = async (searchRequest) => {
  const user = await findOne(modelName, searchRequest);
  if (user) {
    return user;
  }

  return null;
};

const checkUser = async (email, password) => {
  const user = await findOne(modelName, { email: email }); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email,
        fistName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    }
    return undefined;
  }

  return undefined;
};

const createUser = async (user) => {
  const checkUser = await searchOne({ email: user.email });
  if (checkUser) {
    return undefined;
  } else {
    const hash = await getPasswordHash(user.password);
    user.password = hash;
    const userData = await save(user, User);
    return {
      email: userData.email,
      fistName: userData.firstName,
      lastName: userData.lastName,
      _id: userData._id,
    };
  }
};

export { searchOne, checkUser, createUser, createUserValidate };
