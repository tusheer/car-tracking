import Joi from 'joi';

const createSchema = Joi.object().keys({
  name: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  zoomLavel: Joi.number().required(),
  country: Joi.string().required(),
  image: Joi.object().keys({
    url: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

const createValidate = (data) => {
  const result = createSchema.validate(data);
  return result;
};
// const updateValidate = (data) => {
//   const result = updateSchema.validate(data);
//   return result;
// };

export { createValidate };
