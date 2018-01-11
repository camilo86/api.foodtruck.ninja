const router = require('express').Router();
const accountController = require('./../controllers/account')();
const authMiddleware = require('./../middlewares/auth');

module.exports = () => {
  router.post('/', accountController.create);
  router.get('/me', authMiddleware.authRequired, accountController.get);
  router.put('/me', authMiddleware.authRequired, accountController.update);

  return router;
};
