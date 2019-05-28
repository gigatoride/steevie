const Extra = require('telegraf/extra');
const mainAccount = require('./../commands/myaccount');
const controller = require('./../../controller');
const steem = require('steem');
module.exports = async ctx => {
  const { i18n, match, editMessageText, from } = ctx;

  const re = new RegExp('(delete|wallet|back)');
  const queryType = match[0].match(re)[0];

  switch (queryType) {
    case 'wallet':
      const chatId = ctx.from.id;
      const account = await controller.getAccount(chatId);
      if (account) {
        steem.api.getAccounts([account.steemAccount], (err, result) => {
          if (!err) {
            editMessageText(
              i18n.t('my-wallet-details', result[0]),
              Extra.markdown().markup(m =>
                m.inlineKeyboard(
                  [m.callbackButton(i18n.t('back'), 'account:back')],
                  {
                    columns: 2
                  }
                )
              )
            );
          }
        });
      }
      break;
    case 'delete':
      controller.deleteAccount(from.id).then(() => {
        editMessageText(i18n.t('account-deleted-success'));
      });
      break;
    case 'back':
      mainAccount(ctx, { edit: true });
      break;
  }
};
