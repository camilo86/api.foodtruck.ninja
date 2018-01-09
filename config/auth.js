const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('./../models/account');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const account = await Account.findById(id);
      
      if(!account) throw new Error('Passport deserizied account is null');

      done(null, account);
    }
    catch(error) {
      done(error);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'email', passwordField: 'password', passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const account = await Account.findOne({email});

      if(!account) throw new Error('Passport get account by email is null');

      const isPasswordMatch = account.isPasswordMatch(password);

      if(!isPasswordMatch) throw new Error('Email/password do not match');

      done(null, account);
    }
    catch(error) {
      done(error);
    }
  }));

  return passport;
};
