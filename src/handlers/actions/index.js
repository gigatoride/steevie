const { Composer } = require('telegraf');

const composer = new Composer();

const account = require('../actions/account');

/** Account handler */
composer.action(/account:\w+/, account);

module.exports = composer;
