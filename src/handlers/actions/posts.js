const myPosts = require('./../commands/myposts');

/**
 * Action handler for account posts next/previous
 */
module.exports = ctx => {
  const query = ctx.match[0].split(':');
  const type = query[2].match(/(previous|next)/)[0];
  let currentPage = parseInt(query[1]);

  switch (type) {
    case 'next':
      currentPage++;
      myPosts(ctx, { edit: true, currentPage });
      break;
    case 'previous':
      currentPage--;
      myPosts(ctx, { edit: true, currentPage });
      break;
  }
};
