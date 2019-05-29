const WizardScene = require('telegraf/scenes/wizard');
const controller = require('./../controller');
const steem = require('steem');

/**
 * Scene for setting up new account
 */
const setAccount = new WizardScene(
  'set-account-wizard',
  async ctx => {
    const chatId = ctx.from.id;
    const account = await controller.getAccount(chatId);
    if (!account) {
      ctx.replyWithMarkdown(ctx.i18n.t('question-account-name'));
      return ctx.wizard.next();
    } else {
      ctx.reply(ctx.i18n.t('account-already-registered'));
    }
  },
  ctx => {
    const chatId = ctx.from.id;
    const steemAccount = ctx.message.text;
    steem.api.lookupAccountNames([steemAccount], function (err, result) {
      if (!err && result[0]) {
        controller
          .setAccount({
            chatId,
            steemAccount
          })
          .then(() => {
            ctx.reply(ctx.i18n.t('account-register-success'));
          })
          .catch(() => {
            ctx.reply(ctx.i18n.t('account-register-failure'));
          });
        return ctx.scene.leave();
      } else {
        ctx.reply(ctx.i18n.t('account-register-retry'));
      }
    });
  }
);

module.exports = setAccount;
