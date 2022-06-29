import { save, findOne } from '../../common/handler';
import { createUserValidate } from './validation';
import bcrypt from 'bcrypt';
import { User } from 'types';
import randomId from '../../utils/randomId';

const users: User[] = [
  {
    email: 'operator@gmail.com',
    createAt: new Date(),
    updateAt: new Date(),
    lastName: '1',
    firstName: 'User',
    password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
    isActive: true,
    uid: '123456',
    latitude: 23.8007,
    longitude: 90.4262,
    userType: 'OPERATOR',
  },
  {
    email: 'admin2@gmail.com',
    createAt: new Date(),
    updateAt: new Date(),
    lastName: '2',
    firstName: 'User',
    password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
    isActive: true,
    latitude: 23.8004,
    longitude: 90.4261,
    uid: randomId(6),
    userType: 'OPERATOR',
  },
  {
    email: 'admin3@gmail.com',
    createAt: new Date(),
    updateAt: new Date(),
    lastName: '3',
    firstName: 'User',
    latitude: 23.801,
    longitude: 90.423,
    password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
    isActive: true,
    uid: randomId(6),
    userType: 'OPERATOR',
  },
  {
    email: 'admin4@gmail.com',
    createAt: new Date(),
    updateAt: new Date(),
    latitude: 23.7004,
    longitude: 90.4261,
    lastName: '4',
    firstName: 'User',
    password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
    isActive: true,
    uid: randomId(6),
    userType: 'OPERATOR',
  },
  {
    email: 'admin@gmail.com',

    createAt: new Date(),
    updateAt: new Date(),
    lastName: 'User',
    firstName: 'Admin',
    password: '$2b$10$MW/HRUT2IiT1EJISvfLXcuZzorl5F9A4JwSnPRDGvL7H4VNXwYTpm',
    isActive: true,
    uid: randomId(6),
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
        userType: user.userType,
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

const getAllOperators = async () => {
  const operators = users
    .sort((a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf())
    .filter((_user) => _user.userType === 'OPERATOR');

  return operators;
};

export { searchOne, checkUser, createUser, createUserValidate, getAllOperators };
