const mainNotifications = require('../commands/notifications');
const controller = require('../../controllers/account');

/**
 * Notification action handler for enable/disable
 */
module.exports = async ctx => {
  const chatId = ctx.from.id;
  const account = await controller.getAccount(chatId);
  if (account.steemAccount) {
    const query = ctx.match;
    const type = query[1];
    const enabled = query[2] === 'enable';

    const update = await controller.updateNotifications(chatId, type, enabled);
    if (update) return mainNotifications(ctx, { edit: true });
  } else {
    ctx.answerCbQuery(ctx.i18n.t('please-setup-account'));
  }
};
