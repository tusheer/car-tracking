import Joi from 'joi';

const createSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  number: Joi.string().required(),
  avatar: Joi.object()
    .keys({
      url: Joi.string().required(),
    })
    .optional(),
  membershipType: Joi.string().valid('VIP', 'CHILDREN', 'WOMEN', 'PLAYER', 'FOREIGNER', 'NORMAL').required(),
  occupation: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  number: Joi.string().required(),
  avatar: Joi.object()
    .keys({
      url: Joi.string().required(),
    })
    .optional(),
  membershipType: Joi.string().valid('VIP', 'CHILDREN', 'WOMEN', 'PLAYER', 'FOREIGNER', 'NORMAL').required(),
  occupation: Joi.string().required(),
  _id: Joi.string().required(),
  uid: Joi.string().required(),
});

const createValidate = (data) => {
  const result = createSchema.validate(data);
  return result;
};
const updateValidate = (data) => {
  const result = updateSchema.validate(data);
  return result;
};

export { createValidate, updateValidate };
