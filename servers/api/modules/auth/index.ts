import userControler from '../../controllers/auth';
import request from '../../common/request';

export default request((app) => {
  app.use('/api/auth', userControler);
});
