const Account = require('./models/Account');

module.exports = {
  getAccount: async chatId => {
    const account = await Account.find({ chatId });
    return account[0];
  },
  setAccount: async info => {
    const account = new Account(info);
    return account.save();
  },
  deleteAccount: async chatId => {
    return Account.deleteOne({ chatId });
  }
};
