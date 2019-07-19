const { Composer } = require('telegraf');

const composer = new Composer();

const account = require('../actions/account');
const posts = require('../actions/posts');
const notification = require('../actions/notification');

/** Actions handler */
composer.action(/account:\w+/, account);
composer.action(/posts:\d+:(next|previous)/, posts);
composer.action(
  /notification:(transfers|mentions|replies):(disable|enable)/,
  notification
);

module.exports = composer;
