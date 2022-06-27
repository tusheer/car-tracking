import { save, findOne } from '../../common/handler';
import { createUserValidate } from './validation';
import bcrypt from 'bcrypt';
import { User } from 'types';

const users: User[] = [
  {
    email: 'admin@gmail.com',
    assignedCar: [],
    createAt: new Date(),
    updateAt: new Date(),
    assignedCity: [],
    lastName: 'Admin',
    firstName: 'User',
    password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
    isActive: true,
    uid: '123456',
    userType: 'MANAGER',
  },
];

async function getPasswordHash(password) {
  return await bcrypt.hash(password, 10);
}

const searchOne = async (searchRequest) => {
  const user = await findOne(users, searchRequest);
  if (user) {
    return user;
  }

  return null;
};

const checkUser = async (email, password) => {
  const user = await findOne(users, { email: email }); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email,
        fistName: user.firstName,
        lastName: user.lastName,
        uid: user.uid,
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
    const userData = await save(users, user);
    return {
      email: userData.email,
      fistName: userData.firstName,
      lastName: userData.lastName,
      _id: userData._id,
    };
  }
};

export { searchOne, checkUser, createUser, createUserValidate };
