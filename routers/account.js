const router = require('express').Router();
const accountController = require('./../controllers/account')();

module.exports = () => {
  router.post('/', accountController.create);

  return router;
};
