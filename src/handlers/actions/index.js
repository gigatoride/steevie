const { Composer } = require('telegraf');

const composer = new Composer();

const accounts = require('../actions/account');

/** Accounts handler */
composer.action(/account:\w+/, accounts);

module.exports = composer;
