const { Composer } = require('telegraf');

const composer = new Composer();

const account = require('../actions/account');
const notification = require('../actions/notification');

/** Account handler */
composer.action(/account:\w+/, account);
composer.action(/notification:(transfers|mentions|replies):(disable|enable)/, notification);

module.exports = composer;
