const { Composer } = require('telegraf');

const composer = new Composer();

composer.command('setaccount', require('./setaccount'));
composer.command('myaccount', require('./myaccount'));
composer.command('cryptoprices', require('./cryptoprices'));
composer.command('start', require('./start'));
composer.command('help', require('./help'));

module.exports = composer;
