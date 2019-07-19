const Account = require('./models/Account');
const { getSubscribes, truncateReply } = require('./utils');
const { Client } = require('steemradar');

module.exports = async (bot, i18n) => {
  let accounts = await Account.find({});

  // Watch user account changes
  Account.watch().on('change', async () => {
    accounts = await Account.find({}); // Update all accounts
  });

  const client = new Client();

  client.blockchain.setStreamOperations(true);
  const stream = client.blockchain;

  // Notifications by transfers
  stream.on('transaction:transfer', (type, data) => {
    let subs = getSubscribes(accounts, 'transfers');
    const { to, from, amount, memo } = data;
    for (const sub of subs) {
      if (to === sub.steemAccount) {
        bot.telegram.sendMessage(
          sub.chatId,
          i18n.t(i18n.defaultLanguage, 'new-notification-transfer', {
            from,
            amount,
            memo
          })
        );
      }
    }
  });

  // Notifications by replies
  stream.on('transaction:comment:child', (type, data) => {
    let subs = getSubscribes(accounts, 'replies');
    for (const sub of subs) {
      if (data.parent_author === sub.steemAccount) {
        bot.telegram.sendMessage(
          sub.chatId,
          i18n.t(i18n.defaultLanguage, 'new-notification-reply', {
            author: data.author,
            reply: truncateReply(data.body, 56)
          })
        );
      }
    }
  });

  // Notifications by mentions
  stream.on('transaction:comment:body:mention', (type, data) => {
    let subs = getSubscribes(accounts, 'mentions');
    for (const sub of subs) {
      if (data.body.includes('@' + sub.steemAccount)) {
        bot.telegram.sendMessage(
          sub.chatId,
          i18n.t(i18n.defaultLanguage, 'new-notification-mention', {
            author: data.author
          })
        );
      }
    }
  });
};
