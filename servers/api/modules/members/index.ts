// const { authenticateRequest } = require("../../common/middlewares");
import memberControler from '../../controllers/members';
import request from '../../common/request';
export default request((app) => {
  app.use('/api/members', memberControler);
});
