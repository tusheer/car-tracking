import mongoose from 'mongoose';

const save = async (item, model) => {
  const _model = new model(item);
  const savedItem = await _model.save();
  return savedItem;
};

const update = async (item, modelName) => {
  const doc = await mongoose.models[modelName].findOneAndUpdate({ _id: item._id }, item, { new: true });
  return doc;
};

const deleteById = async (id, modelName) => {
  const model = await mongoose.models[modelName].findById(id);
  if (model) {
    const result = await mongoose.models[modelName].deleteOne({ _id: id });
    return result;
  }
  throw new Error('Product not found by the id: ' + id);
};

const getById = async (id, modelName) => {
  const model = await mongoose.models[modelName].findById(id);
  if (model == null) {
    throw new Error('Product not found by the id: ' + id);
  }
  return model;
};

const getAll = async (modelName) => {
  const model = await mongoose.models[modelName].find();
  if (model == null) {
    throw new Error('Product not found by the id: ');
  }
  return model;
};

const findOne = async (modelName, request) => {
  const model = await mongoose.models[modelName].findOne(request);
  return model;
};

const getWithPagination = async (modelName, { limit, skip }: { page: number; limit: number; skip: number }) => {
  const mongoModel = mongoose.models[modelName];

  const totalCount = await mongoModel.count();
  const result = await mongoModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();

  return {
    result: result,
    meta: {
      limit,
      skip,
      count: totalCount,
    },
  };
};

export { save, update, deleteById, getById, getAll, getWithPagination, findOne };
