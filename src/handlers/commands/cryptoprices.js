const CoinMarketCap = require('node-coinmarketcap');
const utils = require('./../../utils');

module.exports = async ctx => {
  const coinmarketcap = new CoinMarketCap();

  let prices = {};

  coinmarketcap.multi(coins => {
    prices.btc = utils.fixedPrice(coins.get('BTC').price_usd);
    prices.eth = utils.fixedPrice(coins.get('ETH').price_usd);
    prices.ltc = utils.fixedPrice(coins.get('LTC').price_usd);
    prices.steem = utils.fixedPrice(coins.get('STEEM').price_usd);
    return ctx.reply(ctx.i18n.t('current-crypto-prices', { prices: prices }));
  });
};
