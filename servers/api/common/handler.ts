const save = async (item, model) => {
  const _model = new model(item);
  const savedItem = await _model.save();
  return savedItem;
};

const matchObject = (object, matchBy) => {
  const keys = Object.keys(matchBy);

  let isMatch = false;

  keys.forEach((key) => {
    if (key in object) {
      isMatch = matchBy[key] === object[key] ? true : false;
    } else {
      return false;
    }
  });

  return isMatch;
};

const update = async (item, modelName) => {
  return true;
};

const deleteById = async (id, modelName) => {
  return true;
};

const getById = async (id, modelName) => {
  return true;
};

const getAll = async (modelName) => {
  return true;
};

const findOne = async (lists, request) => {
  const _lists = [...lists];
  const list = _lists.find((data) => {
    return matchObject(data, request);
  });

  return list;
};

const getWithPagination = async (modelName, { limit, skip }: { page: number; limit: number; skip: number }) => {
  return true;
};

export { save, update, deleteById, getById, getAll, getWithPagination, findOne };
