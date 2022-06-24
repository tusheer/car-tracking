import express from 'express';
import { save, update, deleteById, getById, get, createValidate, updateValidate } from '../../services/member';
import { NotFound } from '../../common/errors';
import { authenticateRequest, avatarUpload, handleValidation } from '../../middlewares/index';
import randomId from '../../utils/randomId';
const router = express.Router();

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await getById(id);
    if (item) {
      res.status(200).send({
        success: true,
        result: item,
      });
    } else {
      throw new NotFound('Product not found by the id: ' + id);
    }
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    let newMember;
    if (req.files && req.files.length > 0) {
      newMember = {
        ...req.body,
        uid: 'CM-' + randomId(6),
        avatar: {
          url: '/static/uploads/avatars/' + req.files[0].filename,
        },
      };
    } else {
      newMember = {
        ...req.body,
      };
    }
    const member = await save(newMember);
    res.status(201).send({
      success: true,
      message: 'Create successfully',
      result: member,
    });
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  const body = req.body;
  let updatedMember;
  try {
    if (req.files && req.files.length > 0) {
      updatedMember = {
        ...body,
        avatar: {
          url: '/static/uploads/avatars/' + req.files[0].filename,
        },
      };
    } else {
      updatedMember = {
        ...req.body,
      };
    }
    const member = await update(updatedMember);
    res.status(200).send({
      success: true,
      message: 'Updated successfully',
      result: member,
    });
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).send({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return next(error, req, res);
  }
};

const getHandler = async (req, res, next) => {
  const { page = 1, limit = 10, skip = 0 } = req.query;
  try {
    const data = await get({ page, limit, skip });
    res.status(200).send(data);
  } catch (error) {
    return next(error, req, res);
  }
};

router.get('/', authenticateRequest, getHandler);
router.get('/:id', authenticateRequest, getByIdHandler);
router.post('/', authenticateRequest, avatarUpload, handleValidation(createValidate), postHandler);
router.put('/', authenticateRequest, avatarUpload, handleValidation(updateValidate), putHandler);
router.delete('/:id', authenticateRequest, deleteHandler);

export default router;
