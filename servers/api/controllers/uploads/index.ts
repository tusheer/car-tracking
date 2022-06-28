import express from 'express';
import { avatarUpload } from '../../middlewares/index';
import { BadRequest } from '../../common/errors';

import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

const imageUploadHander = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      return res.status(200).send({
        url: '/static/uploads/images/' + req.files[0].filename,
        name: req.files[0].filename,
      });
    }

    return new BadRequest('NO file');
  } catch (error) {
    next(error);
  }
};

router.post('/image', avatarUpload, imageUploadHander);

export default router;
