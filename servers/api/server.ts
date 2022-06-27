import dotenv from 'dotenv';
import express, { Express } from 'express';
import { app } from './core/index';
import { handleRequest, handleError } from './middlewares';
import initModules from './modules/index';

dotenv.config();

const port = process.env.PORT || 4000;

const start = async (): Promise<void> => {
  const configureRoutes = async (app: Express): Promise<Express> => {
    app.use(handleRequest);
    app = await initModules(app);
    app.use('/static', express.static(`${__dirname}/public`));
    app.use(handleError);
    return app;
  };

  try {
    await configureRoutes(app);

    app.listen(port, async () => {
      console.log('server is running on port', port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
