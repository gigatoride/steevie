/**
 * Replies with all commands
 */
module.exports = ctx => {
  return ctx.reply(
    ctx.i18n.t('help-message', { commands: ctx.i18n.t('commands') })
  );
};
