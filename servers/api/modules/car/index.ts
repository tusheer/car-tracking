import carController from '../../controllers/car';
import request from '../../common/request';

export default request((app) => {
  app.use('/api/car', carController);
});
