const Account = require('./models/Account');

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
   * Delete account by chatId
   * @param {string} chatId - telegram account chat id
   */
  deleteAccount: async chatId => {
    return Account.deleteOne({ chatId });
  }
};
