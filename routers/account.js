const router = require('express').Router();
const accountController = require('./../controllers/account')();
const authController = require('./../middlewares/auth');

module.exports = () => {
  router.post('/', accountController.create);
  router.get('/me', authController.authRequired, accountController.get);

  return router;
};
