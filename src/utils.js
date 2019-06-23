module.exports = {
  /**
   * Fixed crypto prices decimal according to price
   * @param {string} price
   */
  fixedPrice: price => {
    price = Number(price);
    if (parseInt(price) > 9) {
      return parseInt(price);
    } else {
      return price.toFixed(2);
    }
  },
  /**
   * Convert blockchain reputation into human readable
   * @param {number} reputation
   */
  repLog10: reputation => {
    if (reputation == null) return reputation;
    let rep = String(reputation);
    const neg = rep.charAt(0) === '-';
    rep = neg ? rep.substring(1) : rep;
    let out = str => {
      const leadingDigits = parseInt(str.substring(0, 4));
      const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
      const n = str.length - 1;
      return n + (log - parseInt(log));
    };
    if (isNaN(out)) out = 0;
    out = Math.max(out - 9, 0); // @ -9, $0.50 earned is approx magnitude 1
    out = (neg ? -1 : 1) * out;
    out = out * 9 + 25; // 9 points per magnitude. center at 25
    // base-line 0 to darken and < 0 to auto hide (grep rephide)
    out = parseInt(out);
    return out;
  },
  /**
   * Get subscribes from accounts by type
   */
  getSubscribes: (accounts, type) => {
    return accounts
      .filter(account => {
        return account.notifications[type];
      })
      .map(account => {
        const { chatId, steemAccount } = account;
        return { chatId, steemAccount };
      });
  },
  /**
   * Truncate user reply by num
   */
  truncateReply: (reply, num) => {
    return reply.length > num ? reply.slice(0, num >= 3 ? num - 3 : num) + '...' : reply;
  }
};
