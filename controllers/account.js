const Account = require('./../models/account');

module.exports = (props) => {
  const create = async (req, res) => {
    try {
      const {firstName, lastName, email, password} = req.body;
      const account = await Account.create({firstName, lastName, email, password});

      return res.status(201).json(account);
    }
    catch(error) {
      return res.status(400).json({ message: error });
    }
  };

  const get = (req, res) => {
    return res.json(req.account);
  };

  const update = async (req, res, next) => {
    try {
      const {firstName, lastName, email} = req.body;

      req.account.firstName = firstName || req.account.firstName;
      req.account.lastName = lastName || req.account.lastName;
      req.account.email = email || req.account.email;

      const isEmailUsed = await Account.findOne({email});
      if(isEmailUsed) throw new Error('Email already in used');

      await req.account.save();

      return res.sendStatus(204);
    }
    catch(error) {
      return next(error);
    }
  };

  return {
    create,
    get,
    update
  }
};
