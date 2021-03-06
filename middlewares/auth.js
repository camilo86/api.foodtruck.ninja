const Account = require('./../models/account');
const jwt = require('jsonwebtoken');

exports.getAuthToken = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const account = await Account.findOne({email});
    if(!account) throw new Error('Email/password do not match');

    const isPasswordMatch = await account.isPasswordMatch(password);
    if(!isPasswordMatch) throw new Error('Email/password do not match');

    jwt.sign({id: account.id}, process.env.TOKEN_SECRET, {algorithm: 'HS256'}, (error, token) => {
      if(error) throw error;

      return res.json({token});
    });
  }
  catch(error) {
    next(error);
  }
};

exports.authRequired = (req, res, next) => {
  try {
    jwt.verify(req.header('X-Auth-Token'), process.env.TOKEN_SECRET, async (error, decoded) => {
      if(error) throw error;
      if(!decoded.id) throw new Error('Invalid token');

      req.account = await Account.findById(decoded.id);
      if(!req.account) throw new Error('Account not found');

      next();
    });
  }
  catch(error) {
    next(error);
  }
};
