const mongoose = require('mongoose');

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

module.exports = mongoose.model('Account', accountSchema);
