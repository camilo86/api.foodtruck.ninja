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

  return {
    create
  }
};
