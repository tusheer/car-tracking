import { Express } from 'express';

type CallBack = (app: Express) => void;

export default (callbackFun: CallBack) => {
  return async (app: Express) => {
    callbackFun(app);
  };
};
