const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  mailAddress: String,
  password: String
});

module.exports = mongoose.model('User', User);