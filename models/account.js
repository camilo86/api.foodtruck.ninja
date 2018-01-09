const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const accountSchema = new mongoose.Schema({
  firstName: {type: mongoose.Schema.Types.String, required: true},
  lastName: {type: mongoose.Schema.Types.String, required: true},
  email: {type: mongoose.Schema.Types.String, required: true},
  password: {type: mongoose.Schema.Types.String, required: true}
});

accountSchema.methods.toJSON = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  }
};

accountSchema.pre('save', function(next) {
  const account = this;
  bcryptjs.hash(account.password, 10, (error, hash) => {
    if(error) {
      return next(error);
    }

    account.password = hash;
    next();
  });
});

module.exports = mongoose.model('Account', accountSchema);
