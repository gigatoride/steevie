const Account = require('./models/Account');
const { getSubscribes, truncateReply } = require('./utils');
const steem = require('steem');

module.exports = {
  /**
   * Notifications Subscribes Operator
   */
  notificationsSubscribes: async (bot, i18n) => {
    let accounts = await Account.find({});

    // Watch user account changes
    Account.watch().on('change', async () => {
      accounts = await Account.find({}); // Update all accounts
    });
    steem.api.streamTransactions((err, trx) => {
      if (!err) {
        // Notifications by transfers
        const [type, data] = trx.operations[0];
        let subs;
        switch (type) {
          case 'transfer':
            subs = getSubscribes(accounts, 'transfers');
            const { to, from, amount, memo } = data;
            for (const sub of subs) {
              if (to === sub.steemAccount) {
                bot.telegram.sendMessage(
                  sub.chatId,
                  i18n.t(i18n.defaultLanguage, 'new-notification-transfer', { from, amount, memo })
                );
              }
            }
            break;
          case 'comment':
            // Notifications by replies
            subs = getSubscribes(accounts, 'replies');
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
            // Notifications by mentions
            subs = getSubscribes(accounts, 'mentions');
            for (const sub of subs) {
              if (data.body.includes('@' + sub.steemAccount)) {
                bot.telegram.sendMessage(
                  sub.chatId,
                  i18n.t(i18n.defaultLanguage, 'new-notification-mention', { author: data.author })
                );
              }
            }
            break;
        }
      }
    });
  }
};
