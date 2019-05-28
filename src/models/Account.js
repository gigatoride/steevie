const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  steemAccount: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('Account', AccountSchema);
