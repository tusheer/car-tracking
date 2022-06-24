import Joi from 'joi';

const UserCreateschema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
});

const createUserValidate = (data) => {
  const result = UserCreateschema.validate(data);
  return result;
};

export { createUserValidate };
