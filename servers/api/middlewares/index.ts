import jwt from 'jsonwebtoken';
import { GeneralError, BadRequest } from '../common/errors';
import uploader from '../common/fileupload';
import dotenv from 'dotenv';
dotenv.config();

const handleError = async (err, req, res, next) => {
  if (res?.headersSent) {
    return next(err);
  }
  let code = 500;
  if (err instanceof GeneralError) {
    code = err.getCode();
  }

  const correlationId = req?.headers['x-correlation-id'];
  return (
    res &&
    res.status(code).json({
      correlationId: correlationId,
      message: err.message,
      status: code,
      error: { ...err },
    })
  );
};

const handleRequest = async (req, res, next) => {
  let correlationId = req.headers['x-correlation-id'];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers['x-correlation-id'] = correlationId;
  }

  res.set('x-correlation-id', correlationId);
  return next();
};

const handleValidation = (validate) => {
  return (req, res, next) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) {
      return next();
    }

    const { details } = result.error;
    const messages = details.map((e) => e.message);
    const msg = messages.join(',');
    throw new BadRequest(msg);
  };
};

const authenticateRequest = async (req, res, next) => {
  const auth = req.headers['authorization'];
  if (auth) {
    jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          errorMessage: err.message || 'Invalid token',
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ error: 'Unauthenticated request' });
  }
};

function avatarUpload(req, res, next) {
  const upload = uploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png'],
    100000000,
    'Only .jpg, jpeg or .png format allowed!'
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

export { handleError, handleRequest, handleValidation, authenticateRequest, avatarUpload };
