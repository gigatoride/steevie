require('dotenv').config();
require('./database');
/**
 * Removes console log on production
 */
function noDebug () {}
if (process.env.NODE_ENV !== 'development') {
  global.console.log = noDebug;
  global.console.error = noDebug;
  global.console.info = noDebug;
  global.console.warn = noDebug;
}
require('./bot');
