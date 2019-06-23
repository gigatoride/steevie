const Telegraf = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const path = require('path');
const handlers = require('./handlers');

const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const { setAccount } = require('./scenes');

const bot = new Telegraf(process.env.BOT_TOKEN);

/** Create scene manager */
const stage = new Stage();

/** Register All scenes */
stage.register(setAccount);

/** Translation manager */
const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  allowMissing: false,
  directory: path.resolve(__dirname, 'locales')
});

/** Middlewares */
bot.use(i18n.middleware());
bot.use(session());
stage.use(handlers.actions);
stage.use(handlers.commands);

/** Operator for real-time notifications */
require('./operator').notificationsSubscribes(bot, i18n);

bot.use((ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    if (process.env.NODE_ENV === 'development') console.log('%s response time %s', ctx.from.id, ms);
  });
});

bot.use(stage.middleware());

/** Fixed reply for sticker */
bot.on('sticker', ctx => ctx.reply(ctx.i18n.t('sticker-joke')));

/** Unhandled messages */
bot.on('message', ctx => {
  ctx.reply(ctx.i18n.t('unknown-message'));
});

bot.catch(err => {
  console.log('Ooops', err);
});

/** Let's get this party started. */
bot.launch();
