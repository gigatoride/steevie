const Extra = require('telegraf/extra');
const controller = require('../../controllers/account');

module.exports = async (ctx, opts = {}) => {
  const { reply, i18n, from, editMessageText } = ctx;

  const chatId = from.id;
  const account = await controller.getAccount(chatId);
  if (account.steemAccount) {
    return controller.getNotifications(chatId).then(doc => {
      const { notifications } = doc;

      const callbackButtons = m =>
        ['transfers', 'mentions', 'replies'].map(type => {
          const status = notifications[type] ? 'disable' : 'enable';
          return m.callbackButton(i18n.t(`notification-${type}-${status}`), `notification:${type}:${status}`);
        });

      const notificationMenu = Extra.HTML().markup(m =>
        m.inlineKeyboard(callbackButtons(m), {
          columns: 2
        })
      );

      if (opts.edit) {
        return editMessageText(i18n.t('notifications-main'), notificationMenu);
      } else {
        return reply(i18n.t('notifications-main'), notificationMenu);
      }
    });
  } else {
    ctx.reply(ctx.i18n.t('please-setup-account'));
  }
};
