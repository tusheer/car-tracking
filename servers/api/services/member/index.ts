import {
  save as saveMember,
  update as updateMember,
  getById as getMemberById,
  deleteById as deleteMember,
  getWithPagination,
  getAll as getAllMember,
} from '../../common/handler';
import { createValidate, updateValidate } from './validation';
import Member, { IMember } from '../../models/Member';
import { NotFound } from '../../common/errors';

const modelName = 'Member';

const get = async ({ page, limit, skip }: { page: number; limit: number; skip: number }) => {
  const result = await getWithPagination(modelName, { page, limit, skip });
  return result;
};

const getAll = async () => {
  const result = await getAllMember(modelName);
  return result;
};

const save = async (member: IMember) => {
  const savedItem = await saveMember(member, Member);
  return savedItem;
};

const update = async (member: IMember) => {
  const updatedItem = await updateMember(member, modelName);
  return updatedItem;
};

const deleteById = async (id: string) => {
  const result = await deleteMember(id, modelName);
  return result;
};

const getById = async (id: string) => {
  const item = await getMemberById(id, modelName);
  if (item == null) {
    throw new NotFound('Member not found by the id: ' + id);
  }
  return item;
};

export { save, update, deleteById, getById, get, createValidate, updateValidate, getAll };
