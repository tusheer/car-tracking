import fs from 'fs';
import { Express } from 'express';

const initModules = async (app: Express): Promise<Express> => {
  const rootPath = __dirname;
  const moduleNames = await fs.promises.readdir(rootPath);
  await Promise.all(
    moduleNames.map(async (moduleName) => {
      const stat = await fs.promises.lstat(`${rootPath}/${moduleName}`);
      if (stat.isDirectory()) {
        const module = require(`./${moduleName}`);
        if (module.default) {
          await module.default(app);
          console.log(`Module ${moduleName} loaded`);
        }
      }
    })
  );
  return app;
};

export default initModules;
