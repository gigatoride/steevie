const Extra = require('telegraf/extra');
const steem = require('steem');
const utils = require('./../../utils');
const controller = require('../../controllers/account');

/**
 * Replies with account profile
 */
module.exports = async (ctx, opts = {}) => {
  const chatId = ctx.from.id;
  const account = await controller.getAccount(chatId);
  if (account.steemAccount) {
    steem.api.getAccounts([account.steemAccount], (err, result) => {
      const targetInfo = result[0];

      const customInfo = {
        reputation: utils.repLog10(targetInfo.reputation),
        last_account_update: new Date(targetInfo.last_account_update).toLocaleDateString('en-US')
      };

      const replyInfo = Object.assign(targetInfo, customInfo);

      if (!err) {
        const menu = () =>
          Extra.markdown().markup(m =>
            m.inlineKeyboard(
              [
                m.callbackButton(ctx.i18n.t('my-wallet'), 'account:wallet'),
                m.callbackButton(ctx.i18n.t('delete-account'), 'account:delete')
              ],
              {
                columns: 2
              }
            )
          );
        if (opts.edit) {
          return ctx.editMessageText(ctx.i18n.t('view-account', replyInfo), menu());
        } else {
          return ctx.replyWithMarkdown(ctx.i18n.t('view-account', replyInfo), menu());
        }
      }
    });
  } else {
    ctx.reply(ctx.i18n.t('please-setup-account'));
  }
};
