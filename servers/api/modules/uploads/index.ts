import uploadContainer from '../../controllers/uploads';
import request from '../../common/request';

export default request((app) => {
  app.use('/api/uploads', uploadContainer);
});
