const Account = require('../models/Account');

module.exports = {
  /**
   * Get all information for an account by chat Id
   * @param {string} chatId - telegram account chat id
   */
  getAccount: async chatId => {
    const account = await Account.find({ chatId });
    return account[0];
  },
  /**
   * Setup new account
   * @param {object} info - account details
   */
  setAccount: async info => {
    const account = new Account(info);
    return account.save();
  },
  /**
   * Update notifications
   * @param {string} chatId - telegram account chat id
   * @param {object.<boolean>} type
   */
  updateNotifications: async (chatId, type, enabled) => {
    const update = { $set: {} };
    update.$set[`notifications.${type}`] = enabled;

    return Account.updateOne({ chatId }, update, { upsert: true, setDefaultsOnInsert: true, runValidators: true });
  },
  /**
   * Get notifications
   * @param {string} chatId - telegram account chat id
   */
  getNotifications: async chatId => {
    return Account.findOne({ chatId: chatId }).select('notifications');
  },
  /**
   * Delete account by chatId
   * @param {string} chatId - telegram account chat id
   */
  deleteAccount: async chatId => {
    return Account.deleteOne({ chatId });
  }
};
