const router = require('express').Router();
const authMiddleware = require('./../middlewares/auth');

module.exports = () => {
  router.post('/', authMiddleware.getAuthToken);

  return router;
};
