import cityControler from '../../controllers/city';
import request from '../../common/request';

export default request((app) => {
  app.use('/api/city', cityControler);
});
