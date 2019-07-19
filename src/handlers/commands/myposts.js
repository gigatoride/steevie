const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const { paginate } = require('../../utils');
const steem = require('steem');
const controller = require('../../controllers/account');

/**
 * Replies with Steem account posts
 */
module.exports = async (ctx, opts = {}) => {
  const chatId = ctx.from.id;
  const account = await controller.getAccount(chatId);
  if (account && account.steemAccount) {
    const accountName = account.steemAccount;
    const posts = await steem.api.getDiscussionsByAuthorBeforeDateAsync(
      accountName,
      null,
      null,
      10 // limit
    );
    if (posts.length) {
      const buttons = posts.map(post => {
        return Markup.urlButton(post.title, 'https://steemit.com' + post.url);
      });

      const currentPage = opts.currentPage || 1; // default for front-end
      const pageSize = 6; // posts per page
      const totalPages = Math.ceil(buttons.length / pageSize); // rounds the page number up to the next largest whole number or integer
      let currentPagePosts = paginate(buttons, pageSize, currentPage);

      const paginating = () => {
        const next = Markup.callbackButton(
          ctx.i18n.t('next'),
          `posts:${currentPage}:next`
        );
        const previous = Markup.callbackButton(
          ctx.i18n.t('previous'),
          `posts:${currentPage}:previous`
        );
        if (currentPage === totalPages) {
          return [previous];
        } else if (currentPage === 1) {
          return [next];
        } else {
          return [previous, next];
        }
      };

      const keyboard = Markup.inlineKeyboard(
        currentPagePosts.concat(paginating()),
        {
          columns: 1
        }
      )
        .resize()
        .oneTime();
      if (opts.edit) {
        ctx.editMessageText(
          ctx.i18n.t('my-posts', {
            accountName: accountName,
            totalPages: totalPages,
            currentPage: currentPage
          }),
          Extra.markup(keyboard)
        );
      } else {
        ctx.reply(
          ctx.i18n.t('my-posts', {
            accountName: accountName,
            totalPages: totalPages,
            currentPage: currentPage
          }),
          Extra.markup(keyboard)
        );
      }
    } else {
      ctx.reply(
        ctx.i18n.t('no-posts', {
          accountName: accountName
        })
      );
    }
    ctx.scene.leave();
  } else {
    ctx.reply(ctx.i18n.t('please-setup-account'));
  }
};
