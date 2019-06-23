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
  },
  notifications: {
    replies: Boolean,
    transfers: Boolean,
    mentions: Boolean
  }
});

module.exports = mongoose.model('Account', AccountSchema);
