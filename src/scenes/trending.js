const WizardScene = require('telegraf/scenes/wizard');
const steem = require('steem');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

/**
 * Scene for trending tags
 */
const trending = new WizardScene(
  'trending-wizard',
  async ctx => {
    const limit = 10;
    steem.api.getTrendingTags(null, limit, (err, result) => {
      if (!err) {
        let tags = result.map(tag => tag.name);

        ctx.reply(
          ctx.i18n.t('please-enter-tag-trending'),
          Markup.keyboard(tags.concat(ctx.i18n.t('all-tags')), {
            columns: 3
          })
            .oneTime()
            .resize()
            .extra()
        );
        ctx.wizard.next();
      }
    });
  },
  async ctx => {
    const tag = ctx.message.text;
    if (/([a-z0-9--])/.test(tag)) {
      let query = {
        tag: tag.toLowerCase() === 'all tags' ? null : tag,
        limit: 10
      };
      steem.api.getDiscussionsByTrending(query, (err, result) => {
        if (!err) {
          const buttons = result.map(post => {
            return Markup.urlButton(
              `${post.title} | @${post.author}`,
              'https://steemit.com' + post.url
            );
          });
          const keyboard = Markup.inlineKeyboard(buttons, {
            columns: 1
          })
            .resize()
            .oneTime();
          ctx.reply(
            `Top ${result.length} posts for ${tag}`,
            Extra.markup(keyboard)
          );
          ctx.scene.leave();
        }
      });
    } else {
      ctx.reply(ctx.i18n.t('please-enter-valid-tag'));
    }
  }
);

module.exports = trending;
